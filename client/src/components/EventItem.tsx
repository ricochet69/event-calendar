import * as S from "../components/styles/EventItem.styles";
import { Event } from "../interfaces/calendarInterfaces";
import useWindowSize from "../hooks/useWindowSize";

interface EventItemProps {
  events?: Event[];
  dateValue: Date;
}

const EventItem = ({ events, dateValue }: EventItemProps) => {
  const currentDate = new Date(dateValue).toDateString();
  const { isLarge } = useWindowSize();
  const eventsArray = events;

  const renderEventContainer = (event: Event, modifier: string) => (
    <S.Container
      key={event._id}
      category={event.category.color}
      className={modifier}
      $gridindex={event.gridIndex}
    >
      {isLarge ? (
        ""
      ) : (
        <S.Title
          $fontcolor={
            modifier === "sameday" || modifier === "start" ? "black" : event.category.color
          }
        >
          {event.title}
        </S.Title>
      )}
    </S.Container>
  );

  const eventDuration = (events: Event[]) => {
    return events.map((event) => {
      const eventStartDate = new Date(event.start).toDateString();
      const eventEndDate = new Date(event.end).toDateString();

      if (eventStartDate === currentDate && eventEndDate === currentDate) {
        return renderEventContainer(event, "sameday");
      } else if (eventStartDate === currentDate) {
        return renderEventContainer(event, "start");
      } else if (eventEndDate === currentDate) {
        return renderEventContainer(event, "end");
      } else {
        return renderEventContainer(event, "middle");
      }
    });
  };

  return <>{eventDuration(eventsArray || [])}</>;
};

export default EventItem;
