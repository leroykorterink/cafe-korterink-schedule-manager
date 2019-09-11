import React from "react";
import CalendarItem from "../CalendarItem";
import style from "./CalendarList.module.scss";

const CalendarList = ({ calendars }) => (
  <ul className={style.CalendarList}>
    {calendars.map(calendar => (
      <li key={calendar.id} className={style.listItem}>
        <CalendarItem {...calendar} />
      </li>
    ))}
  </ul>
);

export default CalendarList;
