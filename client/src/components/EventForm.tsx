import { useState } from "react";
import styled from "styled-components";

const EventForm = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const [startDay, setStartDay] = useState();
  const [startMonth, setStartMonth] = useState();
  const [startYear, setStartYear] = useState();

  const [endDay, setEndDay] = useState();
  const [endMonth, setEndMonth] = useState();
  const [endYear, setEndYear] = useState();

  const [isPending, setIsPending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    if (
      startYear !== null &&
      startMonth !== null &&
      startDay !== null &&
      endYear !== null &&
      endMonth !== null &&
      endDay !== null
    ) {
      const startDate = new Date(startYear, startMonth, startDay);
      const endDate = new Date(endYear, endMonth, endDay);
      e.preventDefault();

      const event = { title, description, startDate, endDate };
      console.log(event);

      setIsPending(true);
      // Insert API Call
    } else {
      console.error("Invalid date values.");
    }
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" required value={title} />

        <label htmlFor="description">Description</label>
        <input id="description" type="text" required value={description} />

        <Dates>
          <input name="startDay" type="number" required value={startDay} placeholder="DD" />
          <input name="startMonth" type="number" required value={startMonth} placeholder="MM" />
          <input name="startYear" type="number" required value={startYear} placeholder="YYYY" />
        </Dates>
        <Dates>
          <input name="endDay" type="number" required value={endDay} placeholder="DD" />
          <input name="endMonth" type="number" required value={endMonth} placeholder="MM" />
          <input name="endYear" type="number" required value={endYear} placeholder="YYYY" />
        </Dates>

        {!isPending && <button>Add Event</button>}
        {isPending && <button disabled>Adding event...</button>}
      </Form>
    </Container>
  );
};
export default EventForm;
const Container = styled.div`
  width: 22rem;
  background-color: red;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Dates = styled.div`
  /*  */
`;
