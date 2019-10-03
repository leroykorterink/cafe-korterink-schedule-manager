import classNames from "classnames";
import { differenceInMinutes } from "date-fns";
import React from "react";
import getDurationString from "../../util/getDurationString";
import { ColorContext } from "../ColorContext";
import EventItem from "../EventItem";
import style from "./EventList.module.scss";

const sumEventDurations = events =>
  events.reduce((accumulator, event) => {
    const { end, start, ignoreEvent } = event;

    if (ignoreEvent) {
      return accumulator;
    }

    const startDateTime = start.dateTime || start.date;
    const endDateTime = end.dateTime || end.date;

    const eventDuration = differenceInMinutes(endDateTime, startDateTime);

    return accumulator + eventDuration;
  }, 0);

const countActiveEvents = events =>
  events.reduce((accumulator, currentValue) => {
    if (currentValue.ignoreEvent) {
      return accumulator;
    }

    return accumulator + 1;
  }, 0);

const EventList = ({ className, events, onToggleIgnoreEvent }) => {
  const durationSum = sumEventDurations(events);

  return (
    <div className={classNames(className, style.EventList)}>
      <div className={style.listInformation}>
        <div>
          {countActiveEvents(events)} van {events.length} momenten geselecteerd
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
                  <EventItem
                    {...event}
                    color={getEventColor(event.colorId)}
                    onToggleIgnoreEvent={onToggleIgnoreEvent}
                  />
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
