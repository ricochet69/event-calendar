const processDate = (dateValue: Date) => {
  const currentDate: Date = new Date();
  const day: number = dateValue.getDate();
  const month: number = dateValue.getMonth();
  const year: number = dateValue.getFullYear();
  const firstDayOfMonth: number = new Date(year, month).getDay();
  const startOfMonth: Date = new Date(year, month, 1);

  return { currentDate, day, month, year, firstDayOfMonth, startOfMonth };
};

export default processDate;
