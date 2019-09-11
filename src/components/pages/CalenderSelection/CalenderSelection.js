/* global gapi */
import React from "react";
import CalendarList from "../../CalendarList";
import style from "./CalendarSelection.module.scss";
import ColorContext from "../../ColorContext";

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
        <h2 className={style.title}>Calendars</h2>

        <CalendarList
          calendars={calendars}
          className={style.CalendarList}
          isLoading={isLoading}
        />
      </div>
    );
  }
}

export default props => (
  <ColorContext>
    <CalenderSelection {...props} />
  </ColorContext>
);
