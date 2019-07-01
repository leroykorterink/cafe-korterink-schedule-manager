/* global gapi */
import { format, endOfMonth, startOfMonth } from "date-fns";
import React from "react";
import { withRouter } from "react-router-dom";
import RoutePaths from "../../../enum/RoutePaths";
import QueryFilterKeys from "../../../enum/QueryFilterKeys";
import getValuesFromFormElement from "../../../util/getValuesFromFormElement";
import DateFilter from "../../DateFilter";
import EventList from "../../EventList";
import OverviewOptions from "../../OverviewOptions";

const endOfDay = "T23:59:59.999Z";
const startOfDay = "T00:00:00.000Z";

class Calendar extends React.Component {
  state = {
    isLoading: false,
    events: []
  };

  async componentDidMount() {
    const { location } = this.props;

    const searchParams = new URLSearchParams(location.search);

    const query = {
      timeMax: searchParams.get(QueryFilterKeys.TIME_MAX),
      timeMin: searchParams.get(QueryFilterKeys.TIME_MIN)
    };

    this.fetchCalenderEvents(query);
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

    console.log(response.result.items);

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

  handleSubmit = e => {
    e.preventDefault();

    this.fetchCalenderEvents(getValuesFromFormElement(e.target));
  };

  render() {
    const { events } = this.state;

    return (
      <div>
        <OverviewOptions onSubmit={this.handleSubmit}>
          <DateFilter name={QueryFilterKeys.TIME_MIN} />
          <DateFilter name={QueryFilterKeys.TIME_MAX} />
        </OverviewOptions>

        <EventList events={events} />
      </div>
    );
  }
}

export default withRouter(Calendar);
