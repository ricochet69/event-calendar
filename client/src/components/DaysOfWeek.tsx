import useWindowSize from "../hooks/useWindowSize";
import styled from "styled-components";

const DaysOfWeek = () => {
  const { isSmall } = useWindowSize();

  return (
    <div>
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
    </div>
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
  /* height: 5%; */

  div {
    padding: 0.4rem 0;
    font-weight: 400;
    font-family: ${({ theme }) => theme.fontFamily.primary};
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};

    @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
      font-size: 0.7rem;
      padding: 0.1rem 0;
    }
  }
`;
