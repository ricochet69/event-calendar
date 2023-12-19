import styled from "styled-components";
// import useWindowSize from "../hooks/useWindowSize";
import useResizeObserver from "../hooks/useResizeObserver";
import { CalendarGridProps } from "../interfaces/calendarInterfaces";
import { Button } from "./styles/Button.styled";

interface DatePickerProps extends CalendarGridProps {
  dateValue: Date;
  handleDatePickerToggle: () => void;
}

const DatePicker = ({ dateValue, handleDatePickerToggle }: DatePickerProps) => {
  const { containerRef, hasResized } = useResizeObserver(194);
  // const { isLarge } = useWindowSize();

  const handleOpenModel = () => {
    handleDatePickerToggle();
  };

  return (
    <DateDisplay
      ref={containerRef}
      onClick={handleOpenModel}
      aria-label={`Calendar month ${dateValue.toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
      })}`}
    >
      {hasResized
        ? dateValue.toLocaleString("en-GB", { month: "short", year: "numeric" })
        : dateValue.toLocaleString("en-GB", { month: "long", year: "numeric" })}
    </DateDisplay>
  );
};
export default DatePicker;

const DateDisplay = styled(Button)`
  padding: 0.5rem 1rem;
  flex: 2;

  @media (max-width: ${({ theme }) => theme.breakpoint.large}) {
    /* width: 6.5rem; */
    flex: 1;
  }
`;
