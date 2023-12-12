export const formatDateShort = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  };

  return date.toLocaleString("en-GB", options);
};

export const dateString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return date.toLocaleDateString("en-GB", options);
};

export const weekDay = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
  };

  return date.toLocaleDateString("en-GB", options);
};

// Convert to local time zone
// export const localDateTime = (date: Date) : string =>
//   const localDateTime = new Intl.DateTimeFormat("en-GB", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     weekday: "long",
//     hour: "2-digit",
//     minute: "2-digit",
//     timeZone: userTimeZone,
//   }).format(utcDateTime);

//   console.log("Local Date/Time: ", localDateTime);
