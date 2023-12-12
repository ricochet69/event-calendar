import { CalendarDay } from "../interfaces/calendarInterfaces";

const generateDayClassName = (day: CalendarDay, currentDate: Date) => {
  return !day.isPadding && day.dateValue.toDateString() === currentDate.toDateString()
    ? "current"
    : "";
};

export default generateDayClassName;
