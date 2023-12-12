import styled from "styled-components";
import { Button } from "./styles/Button.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DatePicker from "./DatePicker";
import {
  faChevronLeft,
  faChevronRight,
  faBars,
  faCalendarDay,
  faAnglesDown,
} from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { CalendarEvent, CalendarGridProps } from "../interfaces/calendarInterfaces";
import processDate from "../utils/processDate";
import filterEvents from "../utils/filterEvents";
import SearchBar from "./SearchBar";
import useWindowSize from "../hooks/useWindowSize";

interface CalendarNavProps extends CalendarGridProps {
  openModal: () => void;
  toggleAgenda: () => void;
  autoOpenAgenda: () => void;
  isSidebarOpen: boolean;
}

const NavBarDesktop = ({
  dateValue,
  updateAgenda,
  eventData,
  openModal,
  toggleAgenda,
  autoOpenAgenda,
  isSidebarOpen,
}: CalendarNavProps) => {
  const { isSmall } = useWindowSize();
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
    autoOpenAgenda();

    if (updateAgenda) {
      updateAgenda(todaysDate, todaysEvents);
    }
  };

  const openSidebar = () => toggleAgenda();

  return (
    <>
      <Nav>
        <Button>
          <StyledFontAwesomeIcon iconId={faBars} />
        </Button>
        <DatePicker dateValue={dateValue} openModal={openModal} />
        {isSmall ? "" : <SearchBar />}

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
        <ToggleSidebar onClick={() => openSidebar()}>
          {isSidebarOpen ? (
            <StyledFontAwesomeIcon iconId={faAnglesDown} rotate={"-90deg"} />
          ) : (
            <StyledFontAwesomeIcon iconId={faAnglesDown} rotate={"90deg"} />
          )}
        </ToggleSidebar>
      </Nav>
    </>
  );
};
export default NavBarDesktop;

const Nav = styled.nav`
  width: 100%;
  align-items: center;
  height: 9%;
  padding: 1rem;
  display: flex;
  gap: 3rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.large}) {
    padding: 1rem 1rem;
    gap: 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    padding: 0.2rem;
    height: 50px;
    gap: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 1rem;
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
