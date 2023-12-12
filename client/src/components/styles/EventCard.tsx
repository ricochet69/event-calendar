import { CalendarEvent } from "../../interfaces/calendarInterfaces";
import styled from "styled-components";
import "./EventCard.css";

const EventCard = ({ event }: { event: CalendarEvent }) => {
  const eventStart = new Date(event.start).toDateString();
  const eventEnd = new Date(event.end).toDateString();
  return (
    <CardContainer>
      <CardLabel label={event.label} />
      <CardContent>
        <CardHeader>{event.title}</CardHeader>
        <CardDetails>
          {eventStart} - {eventEnd}
        </CardDetails>
        <CardDetails>{event.description}</CardDetails>
      </CardContent>
    </CardContainer>
  );
};
export default EventCard;

const CardContainer = styled.button`
  width: 100%;
  border: 1px solid #a6a6a6;
  border: 1px solid #a6a6a697;
  border-radius: 10px;

  color: white;
  background-color: #21212d;
  /* background-color: #2c2c38; */
  margin: 0.5rem 0;
  text-align: left;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.05);
  display: flex;
  height: 71px;
  padding: 0.5rem;
`;

const CardContent = styled.div`
  margin-left: 1rem;
`;

const CardHeader = styled.h3`
  margin-bottom: 0.2rem;
`;

interface CardLabelProps {
  label: string;
}

const CardLabel = styled.div<CardLabelProps>`
  background-color: #2be0dd;
  border: 1px solid black;
  width: 5%;
  height: 100%;
  border-radius: 8px;
  margin-left: 0.5rem;
`;
const CardDetails = styled.p`
  margin-bottom: 0.2rem;
  color: #a6a6a6;
`;
