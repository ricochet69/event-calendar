import { CalendarEvent } from "../interfaces/calendarInterfaces";
import EventCard from "./styles/EventCard";

import { weekDay } from "../utils/formatDates";
import styled from "styled-components";
import processDate from "../utils/processDate";
import SearchBar from "./SearchBar";
import { Button } from "./styles/Button.styled";

interface CalendarAgendaProps {
  dateValue: Date;
  events: CalendarEvent[];
}

const CalendarAgenda = ({ dateValue, events }: CalendarAgendaProps) => {
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

  return (
    <AgendaContainer>
      <AgendaWeekday>{weekDay(dateValue)}</AgendaWeekday>
      <AgendaDate>{date}</AgendaDate>
      <AgendaActions>
        <SearchBar />
        <Button>+</Button>
        {/* <AddEvent /> */}
      </AgendaActions>

      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </AgendaContainer>
  );
};
export default CalendarAgenda;

const AgendaContainer = styled.section`
  border-left: 1px solid black;
  height: 100%;
  overflow: auto;
  padding: 0.5rem 1.5rem;
  width: 22rem;
  transition: 2s;
`;

const AgendaWeekday = styled.h2`
  text-align: left;
  font-size: 3rem;
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
