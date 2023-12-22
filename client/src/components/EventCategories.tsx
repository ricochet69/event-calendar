import styled from "styled-components";
import { CalendarEvent } from "../interfaces/calendarInterfaces";
import { useEffect, useState, useMemo } from "react";

interface EventCategoriesProps {
  handleCategorySelection: (category: string, color: string) => void;
  selectedEventData: CalendarEvent | undefined;
  isAddNewEvent: boolean;
}

const EventCategories = ({
  handleCategorySelection,
  selectedEventData,
  isAddNewEvent,
}: EventCategoriesProps) => {
  const eventCategories = useMemo(
    () => [
      { id: 1, name: "Work", color: "#ff00ee" },
      { id: 2, name: "Personal", color: "#e74c3c" },
      { id: 3, name: "Meeting", color: "#2ecc71" },
      { id: 4, name: "Birthday", color: "#f39c12" },
      { id: 5, name: "Holiday", color: "#03f7ff" },
    ],
    []
  );

  const [checkedCategory, setCheckedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (isAddNewEvent === false && selectedEventData) {
      setCheckedCategory(selectedEventData.category.name);
    } else {
      setCheckedCategory(null);
    }
  }, [isAddNewEvent, selectedEventData]);

  const handleCheckboxChange = (name: string, color: string) => {
    handleCategorySelection(name, color);
    setCheckedCategory(name);
  };

  return (
    <CategoryContainer>
      {eventCategories.map(({ id, name, color }) => (
        <Category key={id}>
          <Checkbox
            id={name}
            type="checkbox"
            value={name}
            accentcolor={color}
            checked={checkedCategory === name}
            onChange={() => handleCheckboxChange(name, color)} // Add the onChange handler here
          />
          <Label htmlFor={name}>{name}</Label>
        </Category>
      ))}
    </CategoryContainer>
  );
};

export default EventCategories;

const CategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;
  margin: 0.5rem 0;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 0.5rem 0;
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
`;

interface CheckboxProps {
  accentcolor: string;
}

const Checkbox = styled.input<CheckboxProps>`
  accent-color: ${({ accentcolor }) => accentcolor};
  height: 1.2rem;
  width: 1.2rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin: 0.2rem 0.5rem;
`;
