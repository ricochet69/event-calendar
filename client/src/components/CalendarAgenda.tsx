import { CalendarEvent } from "../interfaces/calendarInterfaces";
import EventCard from "./styles/EventCard";

import { weekDay } from "../utils/formatDates";
import styled from "styled-components";
import processDate from "../utils/processDateValue";
// import SearchBar from "./SearchBar";
import { Button } from "./styles/Button.styled";

interface CalendarAgendaProps {
  dateValue: Date;
  events: CalendarEvent[];
  handleEventModalToggle: () => void;
  selectEvent: (event: CalendarEvent) => void;
  handleAddNewEvent: (value: boolean) => void;
}

const CalendarAgenda = ({
  dateValue,
  events,
  handleEventModalToggle,
  selectEvent,
  handleAddNewEvent,
}: CalendarAgendaProps) => {
  const nthNumber = (dateNumber: number) => {
    if (dateNumber > 3 && dateNumber < 21) return "th";
    switch (dateNumber % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const { day, year } = processDate(dateValue);
  const monthName = dateValue.toLocaleString("default", { month: "long" });
  const date = `${day}${nthNumber(day)} ${monthName} ${year}`;

  // const selectEvent = (event: CalendarEvent) => selectEvent(event);

  const handleClick = () => {
    handleAddNewEvent(true);
    handleEventModalToggle();
  };

  return (
    <AgendaContainer>
      <AgendaWeekday>{weekDay(dateValue)}</AgendaWeekday>
      <AgendaDate>{date}</AgendaDate>
      <AgendaActions>
        {/* <SearchBar /> */}
        <Button type="button" onClick={() => handleClick()}>
          +
        </Button>
        {/* <AddEvent /> */}
      </AgendaActions>

      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          selectEvent={selectEvent}
          handleAddNewEvent={handleAddNewEvent}
        />
      ))}
    </AgendaContainer>
  );
};
export default CalendarAgenda;

const AgendaContainer = styled.section`
  border-left: 1px solid black;
  overflow: auto;
  padding: 0.5rem 1.5rem;
  flex: 1;

  @media (orientation: portrait) {
    height: 50vh;
  }

  @media (orientation: landscape) {
    flex-wrap: nowrap;
    height: 100vh;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.xLarge}) {
    /* width: 100%; */
  }
`;

const AgendaWeekday = styled.h2`
  text-align: left;
  font-size: 2rem;
  font-weight: 400;
  color: white;
`;

const AgendaDate = styled.p`
  color: white;
  font-size: 1rem;
`;

const AgendaActions = styled.div`
  margin: 1.5rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
