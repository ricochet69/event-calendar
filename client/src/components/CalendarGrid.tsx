import { CalendarGridProps, CalendarDay } from "../interfaces/calendarInterfaces";
import styled, { css } from "styled-components";
import generateAriaLabel from "../utils/generateAriaLabel";
import DaysOfWeek from "./DaysOfWeek";
import generateDayClassName from "../utils/generateDayClassName";
import filterEvents from "../utils/filterEvents";
import processDate from "../utils/processDate";
import CalendarEventSpan from "./CalendarEventSpan";

interface CalenderProps extends CalendarGridProps {
  handleAgendaAutoOpen: () => void;
}

const CalendarGrid = ({
  dateValue,
  handleAgendaUpdate,
  eventData,
  handleAgendaAutoOpen,
}: CalenderProps) => {
  const { currentDate, month, firstDayOfMonth, startOfMonth } = processDate(dateValue);

  const startOfCalendar: Date = new Date(
    startOfMonth.setDate(startOfMonth.getDate() - firstDayOfMonth)
  );

  // Generate calendar values
  const calendarDayArray: CalendarDay[] = [];

  for (let i = 0; i < 42; i++) {
    const calendarDate: Date = new Date(startOfCalendar);
    calendarDate.setDate(calendarDate.getDate() + i);

    const dailyEvents = filterEvents({ eventData, filterValue: calendarDate });

    // Push final results to calendarDayArray
    if (calendarDate.getMonth() !== month) {
      calendarDayArray.push({
        id: i,
        isPadding: true,
        dateValue: calendarDate,
        events: dailyEvents,
      });
    } else {
      calendarDayArray.push({
        id: i,
        isPadding: false,
        dateValue: calendarDate,
        events: dailyEvents,
      });
    }
  }

  const handleClick = (selectedDate: Date) => {
    const filterDate = new Date(selectedDate);
    const filteredEvent = filterEvents({ eventData, filterValue: filterDate });
    handleAgendaAutoOpen();
    if (handleAgendaUpdate) {
      handleAgendaUpdate(filterDate, filteredEvent);
    }
  };

  return (
    <>
      <DaysOfWeek />
      <CalendarGridContainer>
        <CalGrid>
          {calendarDayArray.map((day) => (
            <CalendarDayButton
              key={day.id}
              className={day.isPadding ? "padding" : ""}
              onClick={() => handleClick(day.dateValue)}
              aria-label={generateAriaLabel(day.dateValue)}
            >
              <CalendarDayContent>
                <CalendarDateValue className={generateDayClassName(day, currentDate)}>
                  {day.dateValue.getDate()}
                </CalendarDateValue>

                <CalendarDayEvents>
                  {day.events &&
                    day.events
                      .slice(0, 3)
                      .map((event) => (
                        <CalendarEventSpan
                          key={event._id}
                          event={{ ...event, currentDate: day.dateValue }}
                        />
                      ))}

                  {day.events && day.events.length > 3 && (
                    <ExtaEventsContainer>
                      <CalendarDayExtraEvents>{`+ ${
                        day.events.length - 3
                      }`}</CalendarDayExtraEvents>
                    </ExtaEventsContainer>
                  )}
                </CalendarDayEvents>
              </CalendarDayContent>
            </CalendarDayButton>
          ))}
        </CalGrid>
      </CalendarGridContainer>
    </>
  );
};
export default CalendarGrid;

const CalendarGridContainer = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
`;

const CalGrid = styled.div`
  flex-grow: 1;
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  color: ${({ theme }) => theme.colors.textPrimary};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

interface CalendarDayButtonProps {
  className?: string;
}

export const CalendarDayButton = styled.button<CalendarDayButtonProps>`
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.secondary};
  border: none;
  color: inherit;
  font-size: 0.8rem;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #191922;

  ${(props) =>
    props.className &&
    css`
      pointer-events: none;
      opacity: 0.3;
    `}

  &:focus-within {
    outline: 2px solid #ffffff;
    outline-offset: -2px;
  }

  &:hover {
    outline: 2px solid #ffffff;
    outline-offset: -2px;
  }
`;

const CalendarDayContent = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: none;
`;

interface CalendarDateValueProps {
  className?: string;
}

const CalendarDateValue = styled.h4<CalendarDateValueProps>`
  font-weight: 400;
  margin-top: 0.2rem;
  font-size: 1rem;
  width: 28px;
  height: 28px;
  line-height: 28px;
  ${(props) =>
    props.className &&
    css`
      background-color: red;
      color: white;
      border-radius: 5px;
    `};

  @media (max-width: 996px) {
    font-size: 0.7rem;
    width: 16.2px;
    height: 16.2px;
    line-height: 17.2px;
    margin-top: 0.1rem;
    font-weight: 100;
  }
`;

const CalendarDayEvents = styled.div`
  width: 100%;
  margin-top: 3px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const ExtaEventsContainer = styled.div`
  height: 15%;
  width: 100%;
`;

const CalendarDayExtraEvents = styled.p`
  font-size: 0.8rem;

  color: #a6a6a6;

  @media (max-width: ${({ theme }) => theme.breakpoint.medium}) {
    font-size: 0.6rem;
    font-weight: 100;
    display: none;
  }
`;
