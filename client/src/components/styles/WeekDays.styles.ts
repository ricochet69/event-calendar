import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSecondary};
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

export const Day = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: 1rem;
  font-weight: 400;
  padding: 0.2rem 0;

  @media (max-width: 996px) {
    font-size: 0.7rem;
  }

  @media (max-height: 576px) and (max-width: 768px) {
    height: 7vh;
  }
`;
