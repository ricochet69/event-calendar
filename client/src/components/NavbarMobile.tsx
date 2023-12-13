import styled from "styled-components";
import { Button } from "./styles/Button.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faBars,
  faCalendarDay,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { CalendarEvent, CalendarGridProps } from "../interfaces/calendarInterfaces";
import processDate from "../utils/processDate";
import filterEvents from "../utils/filterEvents";
// import SearchBar from "./SearchBar";
// import useWindowSize from "../hooks/useWindowSize";
import DatePicker from "./DatePicker";

interface CalendarNavProps extends CalendarGridProps {
  openModal: () => void;
}

const NavBarMobile = ({ dateValue, updateAgenda, eventData, openModal }: CalendarNavProps) => {
  // const { isSmall } = useWindowSize();

  const changeMonth = (offset: number): void => {
    const { startOfMonth } = processDate(dateValue);
    startOfMonth.setMonth(startOfMonth.getMonth() + offset);
    const todaysEvents: CalendarEvent[] = filterEvents({ eventData, filterValue: startOfMonth });

    if (updateAgenda) {
      updateAgenda(startOfMonth, todaysEvents);
    }
  };

  const getToday = (today: Date) => {
    const { day, month, year } = processDate(today);
    const todaysDate: Date = new Date(year, month, day);
    const todaysEvents: CalendarEvent[] = filterEvents({ eventData, filterValue: todaysDate });

    if (updateAgenda) {
      updateAgenda(todaysDate, todaysEvents);
    }
  };

  return (
    <>
      <Nav>
        <Button>
          <StyledFontAwesomeIcon iconId={faBars} />
        </Button>

        <DatePickerContainer>
          <Button onClick={() => changeMonth(-1)} aria-label="Select previous month">
            <StyledFontAwesomeIcon iconId={faChevronLeft} />
          </Button>
          <DatePicker dateValue={dateValue} openModal={openModal} />

          <Button onClick={() => changeMonth(1)} aria-label="Select next month">
            <StyledFontAwesomeIcon iconId={faChevronRight} />
          </Button>
        </DatePickerContainer>

        <Button>
          <StyledFontAwesomeIcon iconId={faMagnifyingGlass} />{" "}
        </Button>

        <ButtonContainer>
          <Button onClick={() => getToday(new Date())}>
            <StyledFontAwesomeIcon iconId={faCalendarDay} />
          </Button>
        </ButtonContainer>
      </Nav>
    </>
  );
};

export default NavBarMobile;

// Styles
const Nav = styled.nav`
  width: 100%;
  align-items: center;
  height: 10%;
  padding: 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    padding: 0.2rem;
    height: 50px;
    gap: 0.5rem;
  }
`;

const DatePickerContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  flex: 1;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
`;

interface StyledFontAwesomeIconProps {
  iconId: IconDefinition;
}

const StyledFontAwesomeIcon = styled(({ iconId, ...props }: StyledFontAwesomeIconProps) => (
  <FontAwesomeIcon icon={iconId} {...props} />
))`
  color: white;
  font-size: 1em;

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 1em;
  }
`;
