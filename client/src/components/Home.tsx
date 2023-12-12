// import DatePickerModal from "./DatePickerModal2";
import DatePickerModal from "./DatePickerModal";
import { useState } from "react";
import styled from "styled-components";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <HomeContainer>
      <button onClick={openModal}>Open Modal</button>
      <DatePickerModal isOpen={isModalOpen} onClose={closeModal} />
    </HomeContainer>
  );
};
export default Home;

const HomeContainer = styled.div`
  width: 100wv;
  min-height: 100vh;
`;
