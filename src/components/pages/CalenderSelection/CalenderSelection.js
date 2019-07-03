/* global gapi */
import React from "react";
import CalendarList from "../../CalendarList";
import style from "./CalendarSelection.module.scss";

class CalenderSelection extends React.Component {
  state = {
    isLoading: false,
    calendars: []
  };

  async componentDidMount() {
    this.setState({ isLoadig: true });
    const response = await gapi.client.calendar.calendarList.list();

    this.setState({
      isLoading: false,
      calendars: response.result.items
    });
  }

  render() {
    const { isLoading, calendars } = this.state;

    return (
      <div className={style.CalenderSelection}>
        <CalendarList calendars={calendars} isLoading={isLoading} />
      </div>
    );
  }
}

export default CalenderSelection;
