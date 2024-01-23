import { CalendarEvent } from "../interfaces/calendarInterfaces";

const sortEvents = (events: CalendarEvent[], currentDate: Date) => {
  const sortedEvents = [];
  const calendarDate = new Date(currentDate).toDateString();

  // Sort events by oldest starting date
  if (events) {
    events.sort(
      (a: CalendarEvent, b: CalendarEvent) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );
    // Loop though all events for current day
    for (let i = 0; i < events.length; i++) {
      const eventStartDate = new Date(events[i].start).toDateString();

      // If eventStart date = current calendar Date and it has a gridIndex Key, just push to sortedEvents array
      if (eventStartDate === calendarDate && events[i].gridIndex) {
        console.log("Has gridIndex", events[i].start);
        sortedEvents.push(events[i]);

        //   // Else if eventsStart date = current Calendar date
        // } else if (eventStartDate === calendarDate) {
        //   console.log("Event start === calendar Date");
        //   const indexedEvent = { ...events[i], gridIndex: i + 1 };
        //   sortedEvents.push(indexedEvent);
        // } else {
        //   sortedEvents.push(events[i]);
        // }

        // Else if eventsStart date = current Calendar date
      } else {
        console.log("Event start === calendar Date");
        const indexedEvent = { ...events[i], gridIndex: i + 1 };
        sortedEvents.push(indexedEvent);
      }
    }

    // Amend eventData from DB

    //   Return the array so we can set the array in
    return sortedEvents;
  }
};
export default sortEvents;
