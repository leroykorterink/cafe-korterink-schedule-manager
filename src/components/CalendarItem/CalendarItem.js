import classNames from "classnames";
import React from "react";
import RoutePaths from "../../enum/RoutePaths";
import createPath from "../../util/createPath";
import Button from "../general/Button";
import style from "./CalendarItem.module.scss";

const CalendarItem = ({
  backgroundColor,
  foregroundColor,
  id: calendarId,
  primary,
  summary
}) => (
  <Button
    className={classNames(style.CalendarItem, { [style.primary]: primary })}
    to={createPath(RoutePaths.CALENDAR, { calendarId })}
  >
    <div
      style={{ backgroundColor, color: foregroundColor }}
      className={style.background}
    />

    <div className={style.content}>{summary}</div>
  </Button>
);

export default CalendarItem;
