import classNames from "classnames";
import { differenceInMinutes, format } from "date-fns";
import React from "react";
import getDurationString from "../../util/getDurationString";
import Button from "../general/Button";
import style from "./EventItem.module.scss";

const EventItem = ({
  color: { background: backgroundColor },
  end,
  htmlLink,
  start,
  summary
}) => {
  const startDateTime = start.dateTime || start.date;
  const endDateTime = end.dateTime || end.date;

  const timeDifference = differenceInMinutes(endDateTime, startDateTime);

  return (
    <div className={style.EventItem}>
      <div className={classNames(style.column, style.badge)}>
        <div className={style.Badge} style={{ backgroundColor }} />
      </div>

      <div className={classNames(style.column, style.eventDetails)}>
        <div className={style.row}>
          <Button
            className={classNames(style.summary, style.column)}
            href={htmlLink}
            target="_blank"
          >
            <span>{summary}</span>
          </Button>
        </div>

        <div className={style.row}>
          <div className={style.date}>
            {format(startDateTime, "dddd DD MMMM YYYY")}
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
      </div>
    </div>
  );
};

export default EventItem;
