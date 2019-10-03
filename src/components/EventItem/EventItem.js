import classNames from "classnames";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import getDurationString from "../../util/getDurationString";
import Button from "../general/Button";
import Icon from "../general/Icon";
import style from "./EventItem.module.scss";

const EventItem = ({
  color: { background: backgroundColor } = {},
  end,
  htmlLink,
  id: eventId,
  ignoreEvent,
  start,
  summary,
  onToggleIgnoreEvent
}) => {
  const startDateTime = start.dateTime || start.date;
  const endDateTime = end.dateTime || end.date;

  const timeDifference = differenceInMinutes(endDateTime, startDateTime);

  const ToggleIcon = ignoreEvent ? Icon.AddCircle : Icon.RemoveCircle;

  return (
    <div
      className={classNames(style.EventItem, {
        [style.ignored]: ignoreEvent
      })}
    >
      <div className={classNames(style.column, style.badge)}>
        <div className={style.Badge} style={{ backgroundColor }} />
      </div>

      <div className={classNames(style.column, style.eventDetails)}>
        <div className={style.summaryWrapper}>
          <Button
            className={classNames(style.summary, style.column)}
            href={htmlLink}
            target="_blank"
          >
            <span>{summary}</span>
          </Button>

          <div className={style.date}>
            {format(startDateTime, "dddd DD MMMM YYYY")}
          </div>
        </div>

        <div className={style.timeInformation}>
          <div className={style.time}>
            {format(startDateTime, "HH:mm")} - {format(endDateTime, "HH:mm")}
          </div>

          <div className={style.duration}>
            {getDurationString(timeDifference)}
          </div>
        </div>
      </div>

      <Button
        className={classNames(style.columnm, style.toggleButton)}
        onClick={() => onToggleIgnoreEvent(eventId)}
        title={
          ignoreEvent
            ? "Gebruik moment in totaal berekening"
            : "Negeer moment in totaal berekening"
        }
      >
        <ToggleIcon className={style.toggleButtonIcon} />
      </Button>
    </div>
  );
};

export default EventItem;
