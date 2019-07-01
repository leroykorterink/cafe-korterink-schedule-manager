/* global gapi */
import React from "react";
import { Link } from "react-router-dom";
import RoutePaths from "../../../enum/RoutePaths";
import createPath from "../../../util/createPath";

class CalenderSelection extends React.Component {
  state = {
    isLoading: false,
    calendarList: []
  };

  async componentDidMount() {
    this.setState({ isLoadig: true });
    const response = await gapi.client.calendar.calendarList.list();

    this.setState({
      isLoading: false,
      calendarList: response.result.items
    });
  }

  renderListItem = calendar => (
    <li key={calendar.id}>
      <Link to={createPath(RoutePaths.CALENDAR, { calendarId: calendar.id })}>
        {calendar.summary}
      </Link>
    </li>
  );

  render() {
    const { isLoading, calendarList } = this.state;

    if (isLoading) {
      return <div>Kalenders aan het laden</div>;
    }

    return <div>{calendarList.map(this.renderListItem)}</div>;
  }
}

export default CalenderSelection;
