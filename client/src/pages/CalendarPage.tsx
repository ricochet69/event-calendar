import { useState, useEffect } from "react";
import api from "../components/api/posts";
import CalendarGrid from "../components/CalendarGrid";
import CalendarAgenda from "../components/CalendarAgenda";

import { CalendarEvent } from "../interfaces/calendarInterfaces";
import styled from "styled-components";
import filterEvents from "../utils/filterEvents";
import processDate from "../utils/processDate";
import DatePickerModal from "../components/DatePickerModal";
import NavBarDesktop from "../components/NavBarDesktop";

const CalendarPage = () => {
  const [eventData, setEventData] = useState<CalendarEvent[] | undefined>(undefined);
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [date, setDate] = useState<Date>(new Date());
  const [currentEvents, setCurrentEvents] = useState<CalendarEvent[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/calendar");
        const data = response.data;
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

  const updateAgenda = (dateSelected: Date, dailyEvents: CalendarEvent[]) => {
    setDate(dateSelected);
    setCurrentEvents(dailyEvents);
  };

  // Datepick Modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const toggleAgenda = () => {
    setIsSidebarOpen(!isSidebarOpen);
    console.log(isSidebarOpen);
  };

  const autoOpenAgenda = () => setIsSidebarOpen(true);

  return (
    <>
      {isloading && <div>Loading...</div>}

      {!isloading && !error && (
        <CalendarPageContainer>
          <DatePickerModal isOpen={isModalOpen} onClose={closeModal} />
          <CalendarSection1>
            <NavBarDesktop
              dateValue={date}
              updateAgenda={updateAgenda}
              eventData={eventData}
              openModal={openModal}
              toggleAgenda={toggleAgenda}
              autoOpenAgenda={autoOpenAgenda}
              isSidebarOpen={isSidebarOpen}
            />
            <CalendarGrid
              dateValue={date}
              updateAgenda={updateAgenda}
              eventData={eventData}
              autoOpenAgenda={autoOpenAgenda}
            />
          </CalendarSection1>
          {/* <CalendarSection2> */}
          {isSidebarOpen && <CalendarAgenda dateValue={date} events={currentEvents} />}

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

// const CalendarSection2 = styled.div`;
//   height: 100vh;
// `;
