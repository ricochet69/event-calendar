const generateAriaLabel = (dateValue: Date) => {
  return dateValue.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    weekday: "long",
    year: "numeric",
  });
};

export default generateAriaLabel;
