import { CalendarGridProps, CalendarDay } from "../interfaces/calendarInterfaces";
import styled, { css } from "styled-components";
import generateAriaLabel from "../utils/generateAriaLabel";
import DaysOfWeek from "./DaysOfWeek";
import generateDayClassName from "../utils/generateDayClassName";
import filterEvents from "../utils/filterEvents";
import processDate from "../utils/processDate";
import CalendarEventSpan from "./CalendarEventSpan";

interface CalenderProps extends CalendarGridProps {
  autoOpenAgenda: () => void;
}

const CalendarGrid = ({ dateValue, updateAgenda, eventData, autoOpenAgenda }: CalenderProps) => {
  const { currentDate, month, firstDayOfMonth, startOfMonth } = processDate(dateValue);

  const startOfCalendar: Date = new Date(
    startOfMonth.setDate(startOfMonth.getDate() - firstDayOfMonth)
  );

  // Generate calendar values
  const calendarDayArray: CalendarDay[] = [];

  for (let i = 0; i < 42; i++) {
    const calendarDate: Date = new Date(startOfCalendar);
    calendarDate.setDate(calendarDate.getDate() + i);

    const eventsEachDay = filterEvents({ eventData, filterValue: calendarDate });

    // Push final results to calendarDayArray
    if (calendarDate.getMonth() !== month) {
      calendarDayArray.push({
        id: i,
        isPadding: true,
        dateValue: calendarDate,
        events: eventsEachDay,
      });
    } else {
      calendarDayArray.push({
        id: i,
        isPadding: false,
        dateValue: calendarDate,
        events: eventsEachDay,
      });
    }
  }

  const handleClickedDate = (clickedDate: Date) => {
    const dateSelected = new Date(clickedDate);
    console.log("clicked date: ", dateSelected);
    const todaysEvents = filterEvents({ eventData, filterValue: dateSelected });
    autoOpenAgenda();
    if (updateAgenda) {
      updateAgenda(dateSelected, todaysEvents);
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
              onClick={() => handleClickedDate(day.dateValue)}
              aria-label={generateAriaLabel(day.dateValue)}
            >
              <CalendarDayContent>
                <CalendarDayValue className={generateDayClassName(day, currentDate)}>
                  {day.dateValue.getDate()}
                </CalendarDayValue>

                <CalendarDayEvents>
                  {day.events &&
                    day.events
                      .slice(0, 3)
                      .map((event) => (
                        <CalendarEventSpan
                          key={event.id}
                          event={{ ...event, currentDate: day.dateValue }}
                        />
                      ))}

                  {day.events && day.events.length > 3 && (
                    <CalendarDayExtraEvents>{`+ ${day.events.length - 3}`}</CalendarDayExtraEvents>
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
  flex-direction: column;
  height: 88.7%;

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    height: 244px;
  }
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

const CalendarDayButton = styled.button<CalendarDayButtonProps>`
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
    border: none;
    outline: 2px solid #ffffff;
    outline-offset: -2px;
  }

  &:hover {
    border: none;
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

interface CalendarDayValueProps {
  className?: string;
}

const CalendarDayValue = styled.h4<CalendarDayValueProps>`
  font-weight: 600;
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

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 0.7rem;
    width: 16.2px;
    height: 16.2px;
    line-height: 17.2px;
    margin-top: 0.1rem;
    font-weight: 100;
  }
`;

const CalendarDayEvents = styled.div`
  z-index: 10;
  width: 100%;
  margin-top: 3px;
`;

const CalendarDayExtraEvents = styled.p`
  font-size: 0.8rem;
  margin: 4px 0;
  height: 20px;
  color: #a6a6a6;

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 0.6rem;
    margin: 5px 0;
    height: 10px;
    font-weight: 100;
    display: none;
  }
`;
