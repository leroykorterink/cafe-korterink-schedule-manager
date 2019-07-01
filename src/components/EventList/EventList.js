import React from "react";

const EventItem = ({ summary }) => <div>{summary}</div>;

const EventList = ({ events }) => (
  <ul>
    {events.map(event => (
      <li key={event.id}>
        <EventItem {...event} />
      </li>
    ))}
  </ul>
);

export default EventList;
