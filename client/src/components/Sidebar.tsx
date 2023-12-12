import styled from "styled-components";
import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return <>{isOpen && <Container onClick={handleClick}>Hello</Container>}</>;
};
export default Sidebar;

const Container = styled.div`
  width: 22rem;
  height: 100%;
  /* overflow: hidden; */
  border: 2px solid red;
  display: flex;
  flex-direction: column;
`;
