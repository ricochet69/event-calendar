import { useRef, useState } from "react";
import styled, { css } from "styled-components";

interface dateSliderProps {
  width: string;
  showButton: boolean;
  handleDate?: (date: Date) => void;
  startingDate?: Date;
}

// FIX REQUIRED FOR LEAP YEAR DATES

const DateSlider = ({ width, showButton, handleDate, startingDate }: dateSliderProps) => {
  const dayContainerRef = useRef<HTMLDivElement | null>(null);
  const monthContainerRef = useRef<HTMLDivElement | null>(null);
  const yearContainerRef = useRef<HTMLDivElement | null>(null);

  const prev = new Date();
  const next = new Date();
  const year = new Date();

  const [date, setDate] = useState(startingDate ? startingDate : new Date());

  // Previous Dates
  const [prevDate, setPrevDate] = useState(new Date(prev.setDate(prev.getDate() - 1)));
  const [prevMonth, setPrevMonth] = useState(new Date(prev.setMonth(prev.getMonth() - 1)));
  const [prevYear, setPrevYear] = useState(new Date(prev.setFullYear(prev.getFullYear() - 1)));

  // Next Dates
  const [nextDate, setNextDate] = useState(new Date(next.setDate(next.getDate() + 1)));
  const [nextMonth, setNextMonth] = useState(new Date(next.setMonth(next.getMonth() + 1)));
  const [nextYear, setNextYear] = useState(new Date(year.setFullYear(year.getFullYear() + 1)));

  const handleDayDown = (e: React.MouseEvent | React.TouchEvent) => {
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      const deltaY =
        "touches" in moveEvent ? moveEvent.touches[0].clientY - startY : moveEvent.clientY - startY;
      const daysToAdd = Math.floor(deltaY / 5);

      const newDate = new Date(date);
      newDate.setDate(date.getDate() + daysToAdd);
      setDate(newDate);

      if (handleDate) {
        handleDate(newDate);
      }

      const prevDate = new Date(newDate);
      const prevDay = new Date(prevDate.setDate(newDate.getDate() - 1));
      setPrevDate(prevDay);

      const nextDay = new Date(prevDate.setDate(newDate.getDate() + 1));
      setNextDate(nextDay);

      const prevmonth = new Date(prevDate.setMonth(newDate.getMonth() - 1));
      setPrevMonth(prevmonth);

      const nextmonth = new Date(prevDate.setMonth(newDate.getMonth() + 1));
      setNextMonth(nextmonth);

      const currentYear = new Date(newDate);
      const prevYear = new Date(currentYear.setFullYear(newDate.getFullYear() - 1));
      setPrevYear(prevYear);

      const nextYear = new Date(currentYear.setFullYear(newDate.getFullYear() + 1));
      setNextYear(nextYear);
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
  };

  const handleMonthDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    // e.preventDefault();
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveEvent.stopPropagation();
      const deltaY =
        "touches" in moveEvent ? moveEvent.touches[0].clientY - startY : moveEvent.clientY - startY;
      const monthsToAdd = Math.floor(deltaY / 5) % 12;

      const newMonth = (date.getMonth() + monthsToAdd + 12) % 12;
      const newDate = new Date(date);
      newDate.setMonth(newMonth);
      setDate(newDate);

      if (handleDate) {
        handleDate(newDate);
      }

      const prevDate = new Date(newDate);
      const prevMonth = new Date(prevDate.setMonth(newDate.getMonth() - 1));
      setPrevMonth(prevMonth);

      const nextMonth = new Date(prevDate.setMonth(newDate.getMonth() + 1));
      setNextMonth(nextMonth);
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
  };

  const handleYearDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    // e.preventDefault();
    const startY = "touches" in e ? e.touches[0].clientY : e.clientY;

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      moveEvent.stopPropagation();
      const deltaY =
        "touches" in moveEvent ? moveEvent.touches[0].clientY - startY : moveEvent.clientY - startY;
      const yearsToAdd = Math.floor(deltaY / 5);

      const newYear = date.getFullYear() + yearsToAdd;

      const newDate = new Date(date);
      newDate.setFullYear(newYear);
      setDate(newDate);

      if (handleDate) {
        handleDate(newDate);
      }

      const currentYear = new Date(newDate);
      const prevYear = new Date(currentYear.setFullYear(newDate.getFullYear() - 1));
      setPrevYear(prevYear);

      const nextYear = new Date(currentYear.setFullYear(newDate.getFullYear() + 1));
      setNextYear(nextYear);
    };

    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);
  };

  const handleReset = () => {
    const prev = new Date();
    const next = new Date();
    const year = new Date();

    setDate(new Date());
    if (handleDate) {
      handleDate(new Date());
    }

    // Previous Dates
    setPrevDate(new Date(prev.setDate(prev.getDate() - 1)));
    setPrevMonth(new Date(prev.setMonth(prev.getMonth() - 1)));
    setPrevYear(new Date(prev.setFullYear(prev.getFullYear() - 1)));

    // Next Dates
    setNextDate(new Date(next.setDate(next.getDate() + 1)));
    setNextMonth(new Date(next.setMonth(next.getMonth() + 1)));
    setNextYear(new Date(year.setFullYear(year.getFullYear() + 1)));
  };

  return (
    <Content width={width}>
      <Header>
        <Title fontSize={"1.3rem"}>Day</Title>
        <Title fontSize={"1.3rem"}>Month</Title>
        <Title fontSize={"1.3rem"}>Year</Title>
      </Header>
      <SliderContainer>
        <SliderColumn
          ref={dayContainerRef}
          onMouseDown={(e) => handleDayDown(e)}
          onTouchStart={(e) => handleDayDown(e)}
        >
          <SliderItem className="prev">{prevDate.getDate()}</SliderItem>
          <SliderItem>{date.getDate()}</SliderItem>
          <SliderItem className="next">{nextDate.getDate()}</SliderItem>
        </SliderColumn>

        <SliderColumn
          ref={monthContainerRef}
          onMouseDown={(e) => handleMonthDown(e)}
          onTouchStart={(e) => handleMonthDown(e)}
        >
          <SliderItem className="prev">
            {prevMonth.toLocaleString("en-GB", { month: "short" })}
          </SliderItem>
          <SliderItem>{date.toLocaleString("en-GB", { month: "short" })}</SliderItem>
          <SliderItem className="prev">
            {nextMonth.toLocaleString("en-GB", { month: "short" })}
          </SliderItem>
        </SliderColumn>

        <SliderColumn
          ref={yearContainerRef}
          onMouseDown={(e) => handleYearDown(e)}
          onTouchStart={(e) => handleYearDown(e)}
        >
          <SliderItem className="prev">{prevYear.getFullYear()}</SliderItem>
          <SliderItem>{date.getFullYear()}</SliderItem>
          <SliderItem className="prev">{nextYear.getFullYear()}</SliderItem>
        </SliderColumn>
      </SliderContainer>
      {showButton && <SliderButton onClick={() => handleReset()}>Submit</SliderButton>}
    </Content>
  );
};

export default DateSlider;
interface ContentProps {
  width: string;
}

const Content = styled.div<ContentProps>`
  background-color: #fff;
  border-radius: 8px;
  width: ${({ width }) => width};
  /* width: 350px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 500;
  padding: 1rem 0.4rem;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

interface ColumnTitleProps {
  fontSize: string;
}

const Title = styled.h2<ColumnTitleProps>`
  width: 50%;
  text-align: center;
  padding: 0.5rem;
  user-select: none;
  font-size: ${({ fontSize }) => fontSize};
`;

const SliderContainer = styled.div`
  display: flex;
  width: 100%;
`;

const SliderColumn = styled.div`
  height: 100%;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

interface SliderItemProps {
  className?: string;
}
const SliderItem = styled.li<SliderItemProps>`
  list-style: none;
  margin: 0 0.2rem;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
  border: none;
  font-size: 1.3rem;
  user-select: none;

  ${(props) =>
    props.className &&
    css`
      color: rgb(172, 172, 172);
      font-size: 1rem;
    `}
`;

const SliderButton = styled.button`
  padding: 0.5rem 7.5rem;
  margin-top: 1rem;
`;
