import * as S from "../components/styles/CalendarGrid.styles";
import { CalendarGridProps, CalendarDay, Event } from "../interfaces/calendarInterfaces";
import { DateValues } from "../interfaces/dateValuesInterface";

import generateClassName from "../utils/generateClassName";
import generateAriaLabel from "../utils/generateAriaLabel";
import processDateValue from "../utils/processDateValue";

import DaysOfWeek from "./WeekDays";
import EventItem from "./EventItem";

interface CalenderProps extends CalendarGridProps {
  handleAgendaAutoOpen: () => void;
}

const CalendarGrid = (props: CalenderProps) => {
  const dateValues = processDateValue(props.dateValue);
  const eventsArray: Event[] | undefined = props.eventData;
  const calendarDayArray: CalendarDay[] = [];

  const getStartDate = (dateValues: DateValues) => {
    return new Date(
      dateValues.startOfMonth.setDate(
        dateValues.startOfMonth.getDate() - dateValues.firstDayOfMonth
      )
    );
  };

  const getCalendarDate = (startOfCalendar: Date, loopIndex: number): Date => {
    const calendarDate = new Date(startOfCalendar);
    calendarDate.setDate(calendarDate.getDate() + loopIndex);
    return calendarDate;
  };

  const filterEventsByDate = (eventsArray: Event[], filterValue: Date) => {
    return eventsArray.filter((event) => {
      const eventStartDate = new Date(event.start);
      const eventEndDate = new Date(event.end);
      return eventStartDate <= filterValue && eventEndDate >= filterValue;
    });
  };

  const sortEventsByStartDate = (events: Event[]): Event[] => {
    return events.sort((a: Event, b: Event) => {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });
  };

  const assignGridIndex = (sortedEvents: Event[]) => {
    if (eventsArray) {
      for (const event of sortedEvents) {
        const indexOfEvent = eventsArray.findIndex((e) => e._id === event._id ?? -1);

        if (indexOfEvent !== -1) {
          const currentEvent = eventsArray[indexOfEvent];

          if (!currentEvent.gridIndex && currentEvent.start !== currentEvent.end) {
            currentEvent.gridIndex = sortedEvents.indexOf(event) + 1;
          }
        }
      }
    }
  };

  const startOfCalendar = getStartDate(dateValues);

  for (let i = 0; i < 42; i++) {
    if (eventsArray) {
      const calendarDate = getCalendarDate(startOfCalendar, i);
      const filteredEvents = filterEventsByDate(eventsArray, calendarDate);
      const sortedEvents = sortEventsByStartDate(filteredEvents);

      assignGridIndex(sortedEvents);

      if (calendarDate.getMonth() !== dateValues.month) {
        calendarDayArray.push({
          id: i,
          isPadding: true,
          dateValue: calendarDate,
          events: sortedEvents,
        });
      } else {
        calendarDayArray.push({
          id: i,
          isPadding: false,
          dateValue: calendarDate,
          events: sortedEvents,
        });
      }
    }
  }

  const handleClick = (selectedDate: Date) => {
    const filterDate = new Date(selectedDate);
    if (!eventsArray) {
      return;
    }
    const filteredEvents = filterEventsByDate(eventsArray, selectedDate);
    props.handleAgendaAutoOpen();
    if (props.handleAgendaUpdate) {
      props.handleAgendaUpdate(filterDate, filteredEvents);
    }
  };

  return (
    <>
      <DaysOfWeek />
      <S.Container>
        <S.Grid>
          {calendarDayArray.map((day) => (
            <S.GridButton
              key={day.id}
              className={day.isPadding ? "padding" : ""}
              onClick={() => handleClick(day.dateValue)}
              aria-label={generateAriaLabel(day.dateValue)}
            >
              <S.Content>
                <S.DateHeading className={generateClassName(day, dateValues.currentDate)}>
                  {day.dateValue.getDate()}
                </S.DateHeading>
                <S.EventsGrid>
                  {day.events && <EventItem events={day.events} dateValue={day.dateValue} />}
                </S.EventsGrid>
              </S.Content>
            </S.GridButton>
          ))}
        </S.Grid>
      </S.Container>
    </>
  );
};
export default CalendarGrid;
