import { CalendarDay } from "../interfaces/calendarInterfaces";

const generateClassName = (day: CalendarDay, currentDate: Date) => {
  return !day.isPadding && day.dateValue.toDateString() === currentDate.toDateString()
    ? "current"
    : "";
};

export default generateClassName;
