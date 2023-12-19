import styled, { css } from "styled-components";
import DateSlider from "./DateSlider";

interface DatePickerModalProps {
  handleDatePickerToggle: () => void;
}

const DatePickerModal = ({ handleDatePickerToggle }: DatePickerModalProps) => {
  const handleClick = () => handleDatePickerToggle();

  return (
    <ModelContainer onClick={(e) => e.target === e.currentTarget && handleClick()}>
      <DateSlider width={"350px"} showButton={true} />
    </ModelContainer>
  );
};
export default DatePickerModal;

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

  ${(props) =>
    props.className &&
    css`
      display: flex;
    `}
`;
