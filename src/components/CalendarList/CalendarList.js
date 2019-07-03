import React from "react";
import RoutePaths from "../../enum/RoutePaths";
import createPath from "../../util/createPath";
import { ColorContext } from "../ColorContext";
import Button from "../general/Button";
import style from "./CalendarList.module.scss";

const CalendarItem = ({ id: calendarId, summary }) => (
  <Button to={createPath(RoutePaths.CALENDAR, { calendarId })}>
    {summary}
  </Button>
);

const CalendarList = ({ calendars }) => (
  <div className={style.CalendarList}>
    <h2>Calendars</h2>

    <ColorContext.Consumer>
      {({ getCalendarColor }) => (
        <ul>
          {calendars.map(calendar => (
            <li key={calendar.id}>
              <CalendarItem
                {...calendar}
                color={getCalendarColor(calendar.colorId)}
              />
            </li>
          ))}
        </ul>
      )}
    </ColorContext.Consumer>
  </div>
);

export default CalendarList;
