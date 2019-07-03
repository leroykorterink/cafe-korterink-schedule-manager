import classNames from "classnames";
import { differenceInMinutes } from "date-fns";
import React from "react";
import getDurationString from "../../util/getDurationString";
import { ColorContext } from "../ColorContext";
import EventItem from "../EventItem";
import style from "./EventList.module.scss";

const sumEventDurations = events =>
  events.reduce((accumulator, event) => {
    const { end, start } = event;

    const startDateTime = start.dateTime || start.date;
    const endDateTime = end.dateTime || end.date;

    const eventDuration = differenceInMinutes(endDateTime, startDateTime);

    return accumulator + eventDuration;
  }, 0);

const EventList = ({ className, events }) => {
  const durationSum = sumEventDurations(events);

  return (
    <div className={classNames(className, style.EventList)}>
      <div className={style.listInformation}>
        <div>
          Momenten: <span>{events.length}</span>
        </div>

        <div className={style.durationSum}>
          <span>Totaal aantal uren</span>
          <strong>{getDurationString(durationSum)}</strong>
        </div>
      </div>

      {events.length ? (
        <ColorContext.Consumer>
          {({ getEventColor }) => (
            <ul className={style.list}>
              {events.map(event => (
                <li key={event.id}>
                  <EventItem {...event} color={getEventColor(event.colorId)} />
                </li>
              ))}
            </ul>
          )}
        </ColorContext.Consumer>
      ) : (
        <div className={style.fallbackMessage}>Geen momenten gevonden</div>
      )}
    </div>
  );
};

export default EventList;
