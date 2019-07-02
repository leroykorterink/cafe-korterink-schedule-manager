/* global gapi */
import { format, endOfMonth, startOfMonth } from "date-fns";
import React from "react";
import { withRouter } from "react-router-dom";
import RoutePaths from "../../../enum/RoutePaths";
import QueryFilterKeys from "../../../enum/QueryFilterKeys";
import DateFilter from "../../DateFilter";
import EventList from "../../EventList";
import OverviewOptions from "../../OverviewOptions";
import TextFilter from "../../TextFilter";
import style from "./Calendar.module.scss";

const endOfDay = "T23:59:59.999Z";
const startOfDay = "T00:00:00.000Z";

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
      [QueryFilterKeys.SEARCH]: searchParams.get(QueryFilterKeys.SEARCH)
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
    const now = new Date();

    const timeMax =
      query[QueryFilterKeys.TIME_MAX] || format(endOfMonth(now), "YYYY-MM-DD");

    const timeMin =
      query[QueryFilterKeys.TIME_MIN] ||
      format(startOfMonth(now), "YYYY-MM-DD");

    const parsedQuery = {
      // Optional
      ...query,
      [QueryFilterKeys.TIME_MAX]: timeMax + endOfDay,
      [QueryFilterKeys.TIME_MIN]: timeMin + startOfDay,

      // Required
      calendarId: this.props.match.params.calendarId
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

    if (isLoading) {
      return "Loading data";
    }

    return (
      <div className={style.Calendar}>
        <OverviewOptions backLink={RoutePaths.CALENDAR_SELECTION}>
          <DateFilter name={QueryFilterKeys.TIME_MIN} />
          <DateFilter name={QueryFilterKeys.TIME_MAX} />
          <TextFilter name={QueryFilterKeys.SEARCH} />
        </OverviewOptions>

        <EventList className={style.EventList} events={events} />
      </div>
    );
  }
}

export default withRouter(Calendar);
