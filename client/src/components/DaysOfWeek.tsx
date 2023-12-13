import useWindowSize from "../hooks/useWindowSize";
import styled from "styled-components";

const DaysOfWeek = () => {
  const { isSmall } = useWindowSize();

  return (
    <>
      {isSmall ? (
        <Container>
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </Container>
      ) : (
        <Container>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </Container>
      )}
    </>
  );
};

export default DaysOfWeek;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  /* height: 7vh; */

  div {
    font-size: 1rem;
    padding: 0.2rem 0;
    font-weight: 400;
    font-family: ${({ theme }) => theme.fontFamily.primary};
    color: ${({ theme }) => theme.colors.textSecondary};

    /* @media (max-height: 576px) and (max-width: 768px) {
      font-size: 0.7rem;
    } */

    @media (max-width: 996px) {
      font-size: 0.7rem;
    }

    /* @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
      font-size: 0.7rem;
      padding: 0.1rem 0;
    } */
  }
  /* @media (max-width: 576px) {
    height: 3vh;
  } */
  @media (max-height: 576px) and (max-width: 768px) {
    height: 7vh;
  }

  /* @media (max-width: ${({ theme }) => theme.breakpoint.xSmall}) {
    font-size: 0.7rem;
    padding: 0.1rem 0;
    height: 4vh;
  } */
`;
