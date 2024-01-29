// import eventData from "../data/eventData";
import { Event } from "../interfaces/calendarInterfaces";

interface FilterEventProps {
  eventData: Event[] | undefined;
  filterValue: Date;
}

const filterEvents = ({ eventData, filterValue }: FilterEventProps) => {
  if (!eventData) {
    return [];
  }
  return eventData.filter((event: Event) => {
    const eventStartDate: Date = new Date(event.start);
    const eventEndDate: Date = new Date(event.end);
    return eventStartDate <= filterValue && eventEndDate >= filterValue;
  });
};

export default filterEvents;
