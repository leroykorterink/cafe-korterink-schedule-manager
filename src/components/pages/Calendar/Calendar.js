/* global gapi */
import { format, endOfMonth, startOfMonth } from "date-fns";
import React from "react";
import { withRouter } from "react-router-dom";
import RoutePaths from "../../../enum/RoutePaths";
import QueryFilterKeys from "../../../enum/QueryFilterKeys";
import ColorContext from "../../ColorContext";
import EventList from "../../EventList";
import FilterInput from "../../FilterInput";
import OverviewOptions from "../../OverviewOptions";
import style from "./Calendar.module.scss";

const endOfDay = "T23:59:59.999Z";
const startOfDay = "T00:00:00.000Z";

const now = Date.now();
const endOfMonthDateTime = format(endOfMonth(now), "YYYY-MM-DD");
const startOfMonthDateTime = format(startOfMonth(now), "YYYY-MM-DD");

class Calendar extends React.Component {
  state = {
    isLoading: true,
    events: []
  };

  get query() {
    const { location } = this.props;

    const searchParams = new URLSearchParams(location.search);

    return {
      [QueryFilterKeys.TIME_MAX]: searchParams.get(QueryFilterKeys.TIME_MAX),
      [QueryFilterKeys.TIME_MIN]: searchParams.get(QueryFilterKeys.TIME_MIN),
      [QueryFilterKeys.SEARCH]: searchParams.get(QueryFilterKeys.SEARCH),
      [QueryFilterKeys.SHOW_DELETED]: false,
      [QueryFilterKeys.SINGLE_EVENTS]: true
    };
  }

  async componentDidMount() {
    this.fetchCalenderEvents(this.query);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.search === this.props.location.search) {
      return;
    }

    this.fetchCalenderEvents(this.query);
  }

  fetchCalenderEvents = async (query = {}) => {
    const timeMax = query[QueryFilterKeys.TIME_MAX] || endOfMonthDateTime;
    const timeMin = query[QueryFilterKeys.TIME_MIN] || startOfMonthDateTime;

    const parsedQuery = {
      // Optional
      ...query,
      [QueryFilterKeys.TIME_MAX]: timeMax + endOfDay,
      [QueryFilterKeys.TIME_MIN]: timeMin + startOfDay,

      // Required
      calendarId: this.props.match.params.calendarId,
      orderBy: "startTime"
    };

    this.setState({ isLoading: true });
    const eventsPromise = gapi.client.calendar.events
      .list(parsedQuery)
      .getPromise();

    const response = await eventsPromise.catch(this.handleFetchEventError);

    this.setState({
      isLoading: false,
      events: response.result.items
    });
  };

  handleFetchEventError = error => {
    // Redirect to calendar selection when calendar does not exist
    if (error.status === 404) {
      this.props.history.replace(RoutePaths.CALENDAR_SELECTION);
    }

    throw error;
  };

  render() {
    const { events, isLoading } = this.state;

    return (
      <div className={style.Calendar}>
        <OverviewOptions
          backLink={RoutePaths.CALENDAR_SELECTION}
          className={style.OverviewOptions}
          title="Kalendar"
        >
          <span>
            <FilterInput
              name={QueryFilterKeys.TIME_MIN}
              label="Vanaf"
              type="date"
              defaultValue={startOfMonthDateTime}
            />

            <FilterInput
              name={QueryFilterKeys.TIME_MAX}
              label="Tot"
              type="date"
              defaultValue={endOfMonthDateTime}
            />
          </span>

          <FilterInput
            className={style.textFilter}
            name={QueryFilterKeys.SEARCH}
            label="Zoeken"
            type="text"
            standalone
          />
        </OverviewOptions>

        <EventList
          className={style.EventList}
          events={events}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default withRouter(props => (
  <ColorContext>
    <Calendar {...props} />
  </ColorContext>
));
