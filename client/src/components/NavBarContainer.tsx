import { CalendarGridProps } from "../interfaces/calendarInterfaces";
import useWindowSize from "../hooks/useWindowSize";
import NavBarMobile from "./NavbarMobile";
import NavBarDesktop from "./NavBarDesktop";

interface NavBarContainerProps extends CalendarGridProps {
  openModal: () => void;
  toggleAgenda: () => void;
  autoOpenAgenda: () => void;
  isSidebarOpen: boolean;
}

const NavBarContainer = ({
  dateValue,
  updateAgenda,
  eventData,
  openModal,
  toggleAgenda,
  autoOpenAgenda,
  isSidebarOpen,
}: NavBarContainerProps) => {
  const { isSmall } = useWindowSize();

  return (
    <>
      {isSmall ? (
        <NavBarMobile
          dateValue={dateValue}
          updateAgenda={updateAgenda}
          eventData={eventData}
          openModal={openModal}
        />
      ) : (
        <NavBarDesktop
          dateValue={dateValue}
          updateAgenda={updateAgenda}
          eventData={eventData}
          openModal={openModal}
          toggleAgenda={toggleAgenda}
          isSidebarOpen={isSidebarOpen}
          autoOpenAgenda={autoOpenAgenda}
        />
      )}
    </>
  );
};

export default NavBarContainer;
