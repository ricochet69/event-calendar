import { useEffect, useState } from "react";
import styled from "styled-components";
import DateSlider from "./DateSlider";
import EventCategories from "./EventCategories";
import { CalendarEvent } from "../interfaces/calendarInterfaces";
import api from "../components/api/posts";

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

  // Form state
  const eventId: number | undefined = selectedEventData?._id;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Select category");
  const [color, setColor] = useState("");
  const [startDate, setStartDate] = useState(date);
  const [endDate, setEndDate] = useState(startDate);
  const [isPending, setIsPending] = useState(false);

  const updateEventObject = {
    eventId,
    title,
    description,
    start: startDate,
    end: endDate,
    category: {
      name: category,
      color: color,
    },
  };

  const newEventObject = {
    title,
    description,
    start: startDate,
    end: endDate,
    category: {
      name: category,
      color: color,
    },
  };

  useEffect(() => {
    // Check if selectedEventData exists
    // If new event == False render below
    if (isAddNewEvent === false && selectedEventData) {
      setTitle(selectedEventData.title);
      setDescription(selectedEventData.description);
      setCategory(selectedEventData.category.name);
      setColor(selectedEventData.category.color);
      setStartDate(new Date(selectedEventData.start));
      setEndDate(new Date(selectedEventData.end));
    }
  }, [isAddNewEvent, selectedEventData]);

  const [isStartSliderOpen, setIsStartSliderOpen] = useState(false);
  const [isEndSliderOpen, setIsEndSliderOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleClick = () => handleEventModalToggle();

  const handleCategoryToggle = () => setIsCategoryOpen(!isCategoryOpen);

  const handleCategorySelection = (category: string, color: string) => {
    setTimeout(() => {
      setCategory(category);
      setColor(color);
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

  // Create new Event API Call
  const handleNewEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await api.post(`api/calendar/create/`, newEventObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  // Update Event API CALL
  const handleUpdateEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await api.put(`api/calendar/update/${eventId}`, updateEventObject);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteEvent = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await api.delete(`api/calendar/delete/${eventId}`);
      console.log("event deleted", response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ModelContainer onClick={(e) => e.target === e.currentTarget && handleClick()}>
      <EventForm>
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
          <SelectedCategory type="button" onClick={() => handleCategoryToggle()}>
            {category}
          </SelectedCategory>
        </EventCategoryContainer>
        {isCategoryOpen && (
          <EventCategories
            selectedEventData={selectedEventData}
            handleCategorySelection={handleCategorySelection}
            isAddNewEvent={isAddNewEvent}
          />
        )}

        <DateRangeContainer>
          <DateSelect>
            <EventFormLabel htmlFor="start">Start Date:</EventFormLabel>
            <button type="button" onClick={() => handleStartDateToggle()}>
              {startDate.toLocaleDateString("en-GB", options)}
            </button>
          </DateSelect>

          <DateSelect>
            <EventFormLabel htmlFor="endDate">End Date:</EventFormLabel>
            <button type="button" onClick={() => handleEndDateToggle()}>
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
        {isAddNewEvent ? (
          <ButtonContainer>
            <button type="button" onClick={handleNewEvent}>
              Add Event
            </button>
          </ButtonContainer>
        ) : (
          <ButtonContainer>
            <button type="button" onClick={handleUpdateEvent}>
              Update
            </button>
            <button type="button" onClick={handleDeleteEvent}>
              Delete
            </button>
          </ButtonContainer>
        )}

        {/* {!isPending && <button>Add Event</button>}
        {isPending && <button disabled>Adding event...</button>} */}
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

const ButtonContainer = styled.div`
  display: flex;
`;
