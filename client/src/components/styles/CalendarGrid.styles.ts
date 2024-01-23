import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  height: 100%;
  overflow: hidden;
`;

export const Grid = styled.div`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.textPrimary};
  display: grid;
  flex-grow: 1;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  text-align: center;
`;

export const GridButton = styled.button<{ className: string }>`
  align-items: center;
  background-color: ${({ theme }) => theme.colors.secondary};
  border-bottom: 1px solid #191922;
  border: none;
  color: inherit;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  overflow: hidden;
  z-index: 1;

  ${(props) =>
    props.className &&
    css`
      opacity: 0.3;
      pointer-events: none;
    `}

  &:focus-within {
    outline-offset: -2px;
    outline: 2px solid #ffffff;
  }

  &:hover {
    outline-offset: -2px;
    outline: 2px solid #ffffff;
  }
`;

export const Content = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  outline: none;
  width: 100%;
`;

export const DateHeading = styled.h4<{ className: string }>`
  font-size: 1rem;
  font-weight: 400;
  height: 28px;
  line-height: 28px;
  margin-top: 0.2rem;
  width: 28px;
  ${(props) =>
    props.className &&
    css`
      background-color: red;
      border-radius: 5px;
      color: white;
    `};

  @media (max-width: 996px) {
    font-size: 0.7rem;
    font-weight: 100;
    height: 16.2px;
    line-height: 17.2px;
    margin-top: 0.1rem;
    width: 16.2px;
  }
`;

export const EventsGrid = styled.div`
  display: grid;
  gap: 3px;
  grid-template-columns: 100%;
  grid-template-rows: repeat(5, 1fr);
  height: 100%;
  width: 100%;
`;
