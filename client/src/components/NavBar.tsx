import { Event, CalendarGridProps } from "../interfaces/calendarInterfaces";
import styled from "styled-components";

import processDate from "../utils/processDateValue";
import filterEvents from "../utils/filterEvents";
import useWindowSize from "../hooks/useWindowSize";

import DatePicker from "./DatePicker";

import { Button } from "./styles/Button.styled";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faBars,
  faCalendarDay,
  faAnglesDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import EventSearchBar from "./EventSearchBar";
import { useAppContext } from "../hooks/useAppContext";

interface CalendarNavProps extends CalendarGridProps {
  handleDatePickerToggle: () => void;
  handleUpdateSearch: (selectedSearchDate: Date) => void;
}

const Navbar = ({
  // handleAgendaUpdate,
  // eventData,
  handleDatePickerToggle,
  handleUpdateSearch,
}: CalendarNavProps) => {
  const { isSmall, isMedium, isLarge } = useWindowSize();
  const { appState, appDispatch } = useAppContext();

  const changeMonth = (offset: number): void => {
    const { startOfMonth } = processDate(appState.date);

    appDispatch({
      type: "SET_DATE",
      payload: new Date(startOfMonth.setMonth(startOfMonth.getMonth() + offset)),
    });

    const todaysEvents: Event[] = filterEvents({
      eventData: appState.events,
      filterValue: startOfMonth,
    });

    // if (handleAgendaUpdate) {
    //   handleAgendaUpdate(startOfMonth, todaysEvents);
    // }

    appDispatch({ type: "SET_DATE", payload: startOfMonth });
    appDispatch({ type: "SET_CURRENT_EVENTS", payload: todaysEvents });
  };

  const getToday = (today: Date) => {
    const { day, month, year } = processDate(today);
    const todaysDate: Date = new Date(year, month, day);
    appDispatch({
      type: "SET_DATE",
      payload: todaysDate,
    });
    const todaysEvents: Event[] = filterEvents({
      eventData: appState.events,
      filterValue: todaysDate,
    });

    appDispatch({
      type: "TOGGLE_AGENDA",
      payload: (appState.isAgendaOpen = true),
    });

    appDispatch({ type: "SET_DATE", payload: todaysDate });
    appDispatch({ type: "SET_CURRENT_EVENTS", payload: todaysEvents });
  };

  const openAgenda = () => {
    appDispatch({
      type: "TOGGLE_AGENDA",
    });
    console.log(appState.isAgendaOpen);
  };

  return (
    <>
      <Nav>
        <Button>
          <StyledFontAwesomeIcon iconId={faBars} />
        </Button>
        <DatePicker dateValue={appState.date} handleDatePickerToggle={handleDatePickerToggle} />

        {isLarge ? (
          <Button>
            <StyledFontAwesomeIcon iconId={faMagnifyingGlass} />{" "}
          </Button>
        ) : (
          <EventSearchBar handleUpdateSearch={handleUpdateSearch} />
        )}

        <ButtonContainer>
          <Button onClick={() => changeMonth(-1)} aria-label="Select previous month">
            <StyledFontAwesomeIcon iconId={faChevronLeft} />
          </Button>

          <Button onClick={() => changeMonth(1)} aria-label="Select next month">
            <StyledFontAwesomeIcon iconId={faChevronRight} />
          </Button>

          {isSmall ? (
            <Button onClick={() => getToday(new Date())}>
              <StyledFontAwesomeIcon iconId={faCalendarDay} />
            </Button>
          ) : (
            <Button onClick={() => getToday(new Date())}>Today</Button>
          )}
        </ButtonContainer>

        {isMedium ? (
          ""
        ) : (
          <ToggleSidebar onClick={() => openAgenda()}>
            {appState.isAgendaOpen ? (
              <StyledFontAwesomeIcon iconId={faAnglesDown} rotate={"-90deg"} />
            ) : (
              <StyledFontAwesomeIcon iconId={faAnglesDown} rotate={"90deg"} />
            )}
          </ToggleSidebar>
        )}
      </Nav>
    </>
  );
};
export default Navbar;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  width: 100%;
  gap: 1rem;

  @media (max-width: 1400px) {
    padding: 0.5rem 0.2rem;
    gap: 0.5rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 0.5rem;
`;

interface StyledFontAwesomeIconProps {
  iconId: IconDefinition;
  rotate?: string;
}

const StyledFontAwesomeIcon = styled(({ iconId, ...props }: StyledFontAwesomeIconProps) => (
  <FontAwesomeIcon icon={iconId} {...props} />
))`
  color: white;
  font-size: 1em;
  transform: ${({ rotate }) => `rotate(${rotate})`};
`;

const ToggleSidebar = styled(Button)``;
