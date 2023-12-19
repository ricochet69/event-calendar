import { useEffect, useState } from "react";
import styled from "styled-components";
import DateSlider from "./DateSlider";
import EventCategories from "./EventCategories";
import { CalendarEvent } from "../interfaces/calendarInterfaces";

interface ModalProps {
  handleEventModalToggle: () => void;
  date: Date;
  selectedEventData: CalendarEvent | undefined;
  isAddNewEvent: boolean;
}

const EventFormModal = ({
  handleEventModalToggle,
  date,
  selectedEventData,
  isAddNewEvent,
}: ModalProps) => {
  const options: Intl.DateTimeFormatOptions = { weekday: "short", day: "numeric", month: "short" };
  console.log(selectedEventData);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select category");
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(startDate);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    // Check if selectedEventData exists
    // If new event == False render below
    if (isAddNewEvent === false && selectedEventData) {
      setTitle(selectedEventData.title);
      setDescription(selectedEventData.description);
      setStartDate(new Date(selectedEventData.start));
      setEndDate(new Date(selectedEventData.end));
    }
  }, [isAddNewEvent, selectedEventData]);

  const [isStartSliderOpen, setIsStartSliderOpen] = useState(false);
  const [isEndSliderOpen, setIsEndSliderOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleClick = () => handleEventModalToggle();

  const handleCategoryToggle = () => setIsCategoryOpen(!isCategoryOpen);

  const handleCategorySelection = (category: string) => {
    setTimeout(() => {
      setCategory(category);
      setIsCategoryOpen(false);
    }, 200);
  };

  const handleStartDateToggle = () => {
    setIsStartSliderOpen(!isStartSliderOpen);
    setIsEndSliderOpen(false);
  };
  const handleEndDateToggle = () => {
    setIsEndSliderOpen(!isEndSliderOpen);
    setIsStartSliderOpen(false);
  };
  const handleStartDateSelection = (date: Date) => setStartDate(date);
  const handleEndDateSelection = (date: Date) => setEndDate(date);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    console.log(startDate);

    const utcDate = new Date(Date.UTC(2023, 11, 15)); // Note: Months are zero-indexed, so December is 11
    console.log(utcDate.toISOString()); // Outputs: 2023-12-15T00:00:00.000Z

    e.preventDefault();

    const event = { title, description, startDate, endDate };
    console.log(event);

    // setIsPending(true);
    // Insert API Call
  };

  return (
    <ModelContainer onClick={(e) => e.target === e.currentTarget && handleClick()}>
      <EventForm onSubmit={handleSubmit}>
        <EventFormLabel htmlFor="title">Title</EventFormLabel>
        <EventFormInput
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <EventFormLabel htmlFor="description">Description</EventFormLabel>
        <EventFormInput
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <EventCategoryContainer>
          <EventFormLabel htmlFor="category">Category:</EventFormLabel>
          <SelectedCategory onClick={() => handleCategoryToggle()}>{category}</SelectedCategory>
        </EventCategoryContainer>
        {isCategoryOpen && <EventCategories handleCategorySelection={handleCategorySelection} />}

        <DateRangeContainer>
          <DateSelect>
            <EventFormLabel htmlFor="start">Start Date:</EventFormLabel>
            <button onClick={() => handleStartDateToggle()}>
              {startDate.toLocaleDateString("en-GB", options)}
            </button>
          </DateSelect>

          <DateSelect>
            <EventFormLabel htmlFor="endDate">End Date:</EventFormLabel>
            <button onClick={() => handleEndDateToggle()}>
              {endDate.toLocaleDateString("en-GB", options)}
            </button>
          </DateSelect>
        </DateRangeContainer>
        {isStartSliderOpen && (
          <DateSlider
            width={"100%"}
            showButton={false}
            handleDate={handleStartDateSelection}
            startingDate={startDate}
          />
        )}
        {isEndSliderOpen && (
          <DateSlider
            width={"100%"}
            showButton={false}
            handleDate={handleEndDateSelection}
            startingDate={endDate}
          />
        )}
        {/* Add update and delete buttons for when user selects existing event */}

        {!isPending && <button>Add Event</button>}
        {isPending && <button disabled>Adding event...</button>}
      </EventForm>
    </ModelContainer>
  );
};
export default EventFormModal;

const ModelContainer = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.611);
  justify-content: center;
  align-items: center;
  z-index: 1000;
  display: flex;
`;

const EventForm = styled.form`
  background-color: #fff;
  font-family: ${({ theme }) => theme.fontFamily.primary};
  border-radius: 8px;
  width: 350px;
  display: flex;
  flex-direction: column;
  z-index: 500;
  padding: 1rem 1rem;
  font-size: 1.3rem;
`;

const EventFormLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  text-align: left;
`;

const EventFormInput = styled.input`
  font-family: ${({ theme }) => theme.fontFamily.primary};
  width: 100%;
  background: transparent;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 0.9rem;
  color: inherit;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const EventCategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SelectedCategory = styled.button`
  font-size: 1rem;
  border: none;
  outline: none;
  background-color: inherit;
`;

const DateRangeContainer = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DateSelect = styled.div`
  display: flex;
  flex-direction: column;
`;
