import { CalendarEvent } from "../interfaces/calendarInterfaces";
import styled, { css } from "styled-components";
import useWindowSize from "../hooks/useWindowSize";

interface EventAndDate extends CalendarEvent {
  currentDate: Date;
}

const CalendarEventSpan = ({ event }: { event: EventAndDate }) => {
  const { isLarge } = useWindowSize();
  const eventStartDate = new Date(event.start);
  const eventEndDate = new Date(event.end);
  const currentDate = new Date(event.currentDate);

  const checkSpan = (event: EventAndDate) => {
    if (
      eventStartDate.toDateString() === currentDate.toDateString() &&
      eventEndDate.toDateString() === currentDate.toDateString()
    ) {
      return (
        <EventSpan className="sameday">{isLarge ? "" : <Title>{event.title}</Title>}</EventSpan>
      );
    } else if (eventStartDate.toDateString() === currentDate.toDateString()) {
      return <EventSpan className="start">{isLarge ? "" : <Title>{event.title}</Title>}</EventSpan>;
    } else if (eventEndDate.toDateString() === currentDate.toDateString()) {
      return <EventSpan className="end"></EventSpan>;
    } else {
      return <EventSpan className="middle"></EventSpan>;
    }
  };

  return <>{checkSpan(event)}</>;
};

export default CalendarEventSpan;

interface EventSpanProps {
  className: string;
}

const EventSpan = styled.div<EventSpanProps>`
  background-color: #2be0dd;
  /* margin: 4px 0; */
  /* height: 19px; */
  height: 20%;

  ${(props) =>
    props.className === "sameday"
      ? css`
          border-radius: 8px;
        `
      : props.className === "start"
      ? css`
          margin-left: 10px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
        `
      : props.className === "end"
      ? css`
          margin-right: 10px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
        `
      : css`
          background-color: #2be0dd;
          height: 20%;
        `}

  @media(max-width: 996px) {
    /* margin: 2px 0; */
  }

  /* @media (max-width: ${({ theme }) => theme.breakpoint.large}) {
    height: 3px;
    margin: 2px 0;
  } */
`;

const Title = styled.p`
  text-align: left;
  margin-left: 10px;
  line-height: 19px;
  font-size: 1rem;
  color: black;
  font-family: ${({ theme }) => theme.fontFamily.primary};

  white-space: nowrap;
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  max-width: 90px;
  /* max-width: 120px; */
  font-size: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 0.8rem;
  }

  @media (max-width: 1200px) {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
  }
`;
