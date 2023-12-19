import styled from "styled-components";

interface EventCategoriesProps {
  handleCategorySelection: (category: string) => void;
}

const EventCategories = ({ handleCategorySelection }: EventCategoriesProps) => {
  const eventCategories = [
    { id: 1, name: "Work", color: "#ff00ee" },
    { id: 2, name: "Personal", color: "#e74c3c" },
    { id: 3, name: "Meeting", color: "#2ecc71" },
    { id: 4, name: "Birthday", color: "#f39c12" },
    { id: 5, name: "Holiday", color: "#03f7ff" },
  ];

  const handleClick = (name: string) => handleCategorySelection(name);

  return (
    <CategoryContainer>
      {eventCategories.map(({ id, name, color }) => (
        <Category key={id}>
          <Checkbox
            id={name}
            type="checkbox"
            value={name}
            accentColor={color}
            onClick={() => handleClick(name)}
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
  accentColor: string;
}

const Checkbox = styled.input<CheckboxProps>`
  accent-color: ${({ accentColor }) => accentColor};
  height: 1.2rem;
  width: 1.2rem;
`;

const Label = styled.label`
  font-size: 1rem;
  margin: 0.2rem 0.5rem;
`;
