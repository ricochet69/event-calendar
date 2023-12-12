type CalendarItem = {
  id: number;
  paddingDate: boolean;
  date: number;
  isCurrentDay: boolean;
};

type GetCalendarArr = (
  id: number,
  paddingDate: boolean,
  date: number,
  isCurrentDay: boolean
) => CalendarItem;

export const getCalendarArr: GetCalendarArr = (id, paddingDate, date, isCurrentDay) => {
  return {
    id,
    paddingDate,
    date,
    isCurrentDay,
  };
};
