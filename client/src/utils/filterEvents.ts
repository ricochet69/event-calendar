// import eventData from "../data/eventData";
import { CalendarEvent } from "../interfaces/calendarInterfaces";

interface FilterEventProps {
  eventData: CalendarEvent[] | undefined;
  filterValue: Date;
}

const filterEvents = ({ eventData, filterValue }: FilterEventProps) => {
  if (!eventData) {
    return [];
  }
  return eventData.filter((event: CalendarEvent) => {
    const eventStartDate: Date = new Date(event.start);
    const eventEndDate: Date = new Date(event.end);
    return eventStartDate <= filterValue && eventEndDate >= filterValue;
  });
};

export default filterEvents;
