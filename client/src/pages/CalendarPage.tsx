import { useState, useEffect } from "react";
import CalendarGrid from "../components/CalendarGrid";
import CalendarAgenda from "../components/CalendarAgenda";
import { Event } from "../interfaces/calendarInterfaces";
import styled from "styled-components";
import filterEvents from "../utils/filterEvents";
import processDate from "../utils/processDateValue";
import DatePickerModal from "../components/DatePickerModal";
import NavBar from "../components/NavBar";
import EventFormModal from "../components/EventFormModal";

import { useAppContext } from "../hooks/useAppContext";
import calendarService from "../services/calendarService";

const CalendarPage = () => {
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // useReducer for handleAgendaUpdate
  const { appState, appDispatch } = useAppContext();

  // Models & sidebars
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [isEventFormModalOpen, setIsEventFormModalOpen] = useState<boolean>(false);

  // Event state for selected event card
  const [selectedEventData, setSelectedEventData] = useState<Event | undefined>(undefined);

  useEffect(() => {
    const getCalendarEventData = async () => {
      try {
        const response = await calendarService.getCalendarData();
        updateEvents(response.data);
        updateCurrentEvents(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    };

    getCalendarEventData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateEvents = (data: Event[]) => {
    appDispatch({ type: "SET_EVENTS", payload: data });
  };

  const updateCurrentEvents = (data: Event[]) => {
    const { day, month, year } = processDate(new Date());
    const todaysDate: Date = new Date(year, month, day);
    const todaysEvents: Event[] = filterEvents({
      eventData: data,
      filterValue: todaysDate,
    });

    appDispatch({ type: "SET_CURRENT_EVENTS", payload: todaysEvents });
  };

  // DatePicker Modal
  const handleDatePickerToggle = () => setIsDatePickerOpen(!isDatePickerOpen);

  // EventForm Modal
  const handleEventModalToggle = () => setIsEventFormModalOpen(!isEventFormModalOpen);

  // Add or view event details ---MAKE into  a useReducer
  const selectEvent = (event: Event) => {
    setSelectedEventData(event);
    setIsEventFormModalOpen(true);
  };

  // Make into useReducer
  const handleUpdateSearch = (selectedSearchDate: Date) => {
    const searchedDate = new Date(selectedSearchDate);
    const filteredEvents = filterEvents({ eventData: appState.events, filterValue: searchedDate });
    appDispatch({ type: "SET_DATE", payload: searchedDate });
    appDispatch({ type: "SET_CURRENT_EVENTS", payload: filteredEvents });
    // handleAgendaUpdate(searchedDate, filteredEvents);
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
              selectedEventData={selectedEventData}
            />
          )}

          <CalendarSection1>
            <NavBar
              // eventData={eventData}
              handleDatePickerToggle={handleDatePickerToggle}
              handleUpdateSearch={handleUpdateSearch}
            />

            <CalendarGrid />
          </CalendarSection1>
          {appState.isAgendaOpen && (
            <CalendarAgenda
              // events={state.currentEvents}
              handleEventModalToggle={handleEventModalToggle}
              selectEvent={selectEvent}
            />
          )}
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
