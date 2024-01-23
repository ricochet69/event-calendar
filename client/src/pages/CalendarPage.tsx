import { useState, useEffect } from "react";
import api from "../components/api/posts";
import CalendarGrid from "../components/CalendarGrid";
import CalendarAgenda from "../components/CalendarAgenda";

import { CalendarEvent } from "../interfaces/calendarInterfaces";
import styled from "styled-components";
import filterEvents from "../utils/filterEvents";
import processDate from "../utils/processDateValue";
import DatePickerModal from "../components/DatePickerModal";
import NavBar from "../components/NavBar";
import EventFormModal from "../components/EventFormModal";

const CalendarPage = () => {
  const [eventData, setEventData] = useState<CalendarEvent[] | undefined>(undefined);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [date, setDate] = useState<Date>(new Date());
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);

  // Models & sidebars
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState<boolean>(false);
  const [isAgendaOpen, setIsAgendaOpen] = useState<boolean>(true);
  const [isAddNewEvent, setIsAddNewEvent] = useState<boolean>(false);

  // Event state for selected event card
  const [selectedEventData, setSelectedEventData] = useState<CalendarEvent | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/calendar");
        const data = response.data;
        console.log(data);
        setEventData(data);

        const { day, month, year } = processDate(new Date());
        const todaysDate: Date = new Date(year, month, day);
        const todaysEvents: CalendarEvent[] = filterEvents({
          eventData: data,
          filterValue: todaysDate,
        });

        setCurrentEvents(todaysEvents);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // DatePicker Modal
  const handleDatePickerToggle = () => setIsDatePickerOpen(!isDatePickerOpen);

  // Agenda Sidebar
  const handleAgendaToggle = () => setIsAgendaOpen(!isAgendaOpen);
  const handleAgendaAutoOpen = () => setIsAgendaOpen(true);
  const handleAgendaUpdate = (selectedDate: Date, dailyEvents: CalendarEvent[]) => {
    setDate(selectedDate);
    setCurrentEvents(dailyEvents);
  };
  const handleAddNewEvent = (value: boolean) => {
    setIsAddNewEvent(value);
  };

  // EventForm Modal
  const handleEventModalToggle = () => setIsEventFormModalOpen(!isEventFormModalOpen);

  // Add or view event details
  const selectEvent = (event: CalendarEvent) => {
    setSelectedEventData(event);
    setIsEventFormModalOpen(true);
  };

  const handleUpdateSearch = (selectedSearchDate: Date) => {
    const searchedDate = new Date(selectedSearchDate);
    const filteredEvents = filterEvents({ eventData, filterValue: searchedDate });
    setDate(searchedDate);
    handleAgendaUpdate(searchedDate, filteredEvents);
  };
  return (
    <>
      {isloading && <div>Loading...</div>}

      {!isloading && !error && (
        <CalendarPageContainer>
          {isDatePickerOpen && <DatePickerModal handleDatePickerToggle={handleDatePickerToggle} />}

          {isEventFormModalOpen && (
            <EventFormModal
              handleEventModalToggle={handleEventModalToggle}
              date={date}
              selectedEventData={selectedEventData}
              isAddNewEvent={isAddNewEvent}
            />
          )}

          <CalendarSection1>
            <NavBar
              dateValue={date}
              handleAgendaUpdate={handleAgendaUpdate}
              eventData={eventData}
              handleDatePickerToggle={handleDatePickerToggle}
              handleAgendaToggle={handleAgendaToggle}
              handleAgendaAutoOpen={handleAgendaAutoOpen}
              isAgendaOpen={isAgendaOpen}
              handleUpdateSearch={handleUpdateSearch}
            />
            <CalendarGrid
              dateValue={date}
              handleAgendaUpdate={handleAgendaUpdate}
              eventData={eventData}
              handleAgendaAutoOpen={handleAgendaAutoOpen}
            />
          </CalendarSection1>
          {/* <CalendarSection2> */}
          {isAgendaOpen && (
            <CalendarAgenda
              dateValue={date}
              events={currentEvents}
              handleEventModalToggle={handleEventModalToggle}
              selectEvent={selectEvent}
              handleAddNewEvent={handleAddNewEvent}
            />
          )}

          {/* </CalendarSection2> */}
        </CalendarPageContainer>
      )}

      {error && <div>Error fetching data</div>}
    </>
  );
};
export default CalendarPage;

const CalendarPageContainer = styled.div`
  min-height: 100vh;

  @media (orientation: portrait) {
    display: block;
    height: 50vh;
  }

  @media (orientation: landscape) {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
  }
`;

const CalendarSection1 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;

  @media (orientation: portrait) {
    height: 50vh;
  }

  @media (orientation: landscape) {
    display: flex;
    flex-wrap: nowrap;
    height: 100vh;
  }

  @media (min-width: 1400px) {
    flex: 4;
  }
`;
