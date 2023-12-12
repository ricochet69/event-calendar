import styled from "styled-components";
import useWindowSize from "../hooks/useWindowSize";
import { CalendarGridProps } from "../interfaces/calendarInterfaces";
import { Button } from "./styles/Button.styled";

interface DatePickerProps extends CalendarGridProps {
  dateValue: Date;
  openModal: () => void;
}

const DatePicker = ({ dateValue, openModal }: DatePickerProps) => {
  const { isLarge } = useWindowSize();

  const handleOpenModel = () => {
    openModal();
  };

  return (
    <DateDisplay
      onClick={handleOpenModel}
      aria-label={`Calendar month ${dateValue.toLocaleString("en-GB", {
        month: "long",
        year: "numeric",
      })}`}
    >
      {isLarge
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
