import { Event } from "../interfaces/calendarInterfaces";
import EventCard from "./styles/EventCard";

import { weekDay } from "../utils/formatDates";
import styled from "styled-components";
import processDate from "../utils/processDateValue";
// import SearchBar from "./SearchBar";
import { Button } from "./styles/Button.styled";
import { useAppContext } from "../hooks/useAppContext";

interface CalendarAgendaProps {
  // events: Event[];
  handleEventModalToggle: () => void;
  selectEvent: (event: Event) => void;
}

const CalendarAgenda = ({ handleEventModalToggle, selectEvent }: CalendarAgendaProps) => {
  const { appState, appDispatch } = useAppContext();
  console.log(appState.date);

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

  const { day, year } = processDate(appState.date);
  const monthName = appState.date.toLocaleString("default", { month: "long" });
  const date = `${day}${nthNumber(day)} ${monthName} ${year}`;

  // const selectEvent = (event: Event) => selectEvent(event);

  const handleClick = () => {
    appDispatch({ type: "SET_ADD_NEW_EVENT", payload: (appState.isAddNewEvent = true) });
    handleEventModalToggle();
  };

  return (
    <AgendaContainer>
      <AgendaWeekday>{weekDay(appState.date)}</AgendaWeekday>
      <AgendaDate>{date}</AgendaDate>
      <AgendaActions>
        {/* <SearchBar /> */}
        <Button type="button" onClick={() => handleClick()}>
          +
        </Button>
        {/* <AddEvent /> */}
      </AgendaActions>

      {appState.currentEvents.map((event) => (
        <EventCard key={event._id} event={event} selectEvent={selectEvent} />
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
