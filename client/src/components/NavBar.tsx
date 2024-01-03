import { CalendarEvent, CalendarGridProps } from "../interfaces/calendarInterfaces";
import styled from "styled-components";

import processDate from "../utils/processDate";
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

interface CalendarNavProps extends CalendarGridProps {
  handleDatePickerToggle: () => void;
  handleAgendaToggle: () => void;
  handleAgendaAutoOpen: () => void;
  isAgendaOpen: boolean;
  handleUpdateSearch: (selectedSearchDate: Date) => void;
}

const Navbar = ({
  dateValue,
  handleAgendaUpdate,
  eventData,
  handleDatePickerToggle,
  handleAgendaToggle,
  handleAgendaAutoOpen,
  isAgendaOpen,
  handleUpdateSearch,
}: CalendarNavProps) => {
  const { isSmall, isMedium, isLarge } = useWindowSize();
  const changeMonth = (offset: number): void => {
    const { startOfMonth } = processDate(dateValue);
    startOfMonth.setMonth(startOfMonth.getMonth() + offset);
    const todaysEvents: CalendarEvent[] = filterEvents({ eventData, filterValue: startOfMonth });

    if (handleAgendaUpdate) {
      handleAgendaUpdate(startOfMonth, todaysEvents);
    }
  };

  const getToday = (today: Date) => {
    const { day, month, year } = processDate(today);
    const todaysDate: Date = new Date(year, month, day);
    const todaysEvents: CalendarEvent[] = filterEvents({ eventData, filterValue: todaysDate });
    handleAgendaAutoOpen();

    if (handleAgendaUpdate) {
      handleAgendaUpdate(todaysDate, todaysEvents);
    }
  };

  const openSidebar = () => handleAgendaToggle();

  return (
    <>
      <Nav>
        <Button>
          <StyledFontAwesomeIcon iconId={faBars} />
        </Button>
        <DatePicker dateValue={dateValue} handleDatePickerToggle={handleDatePickerToggle} />

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
          <ToggleSidebar onClick={() => openSidebar()}>
            {isAgendaOpen ? (
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
