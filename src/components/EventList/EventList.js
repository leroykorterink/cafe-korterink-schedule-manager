import { differenceInMinutes } from "date-fns";
import React from "react";
import { ColorContext } from "../ColorContext";

const getDurationString = minutes => {
  const hours = Math.trunc(minutes / 60)
    .toString()
    .padStart(2, "0");

  const remainingMinutes = Math.abs(minutes % 60)
    .toString()
    .padStart(2, "0");

  return `${hours}:${remainingMinutes}`;
};

const EventItem = ({
  color: { background: backgroundColor, foreground: foregroundColor },
  end,
  start,
  summary
}) => {
  const duration = differenceInMinutes(
    end.dateTime || end.date,
    start.dateTime || start.date
  );

  return (
    <div style={{ backgroundColor, color: foregroundColor }}>
      Summary: {summary} Tijdsduur: {getDurationString(duration)}
    </div>
  );
};

const EventList = ({ className, events }) => {
  const durationSum = events.reduce((accumulator, event) => {
    const { end, start } = event;

    const eventDuration = differenceInMinutes(
      end.dateTime || end.date,
      start.dateTime || start.date
    );

    return accumulator + eventDuration;
  }, 0);

  return (
    <div className={className}>
      <div>Totaal aantal uren {getDurationString(durationSum)}</div>

      <ColorContext.Consumer>
        {({ getEventColor }) => (
          <ul>
            {events.map(event => (
              <li key={event.id}>
                <EventItem {...event} color={getEventColor(event.colorId)} />
              </li>
            ))}
          </ul>
        )}
      </ColorContext.Consumer>
    </div>
  );
};

export default EventList;
