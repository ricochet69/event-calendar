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
  faMagnifyingGlass,
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
  const { isSmall, isMedium, isLarge } = useWindowSize();
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

        {isLarge ? (
          <Button>
            <StyledFontAwesomeIcon iconId={faMagnifyingGlass} />{" "}
          </Button>
        ) : (
          <SearchBar />
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
            {isSidebarOpen ? (
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
export default NavBarDesktop;

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
