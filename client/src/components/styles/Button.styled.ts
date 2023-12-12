import styled from "styled-components";

type ButtonProps = {
  backgroundcolor?: string;
  border?: string;
  boxshadow?: string;
  color?: string;
  fontSize?: string;
  fontWeight?: string;
};

export const Button = styled.button<ButtonProps>`
  text-align: center;
  cursor: pointer;

  background-color: ${({ backgroundcolor, theme }) =>
    backgroundcolor ? backgroundcolor : theme.colors.buttonPrimary};

  border: ${({ border, theme }) => (border ? border : `2px solid ${theme.colors.borderPrimary}`)};
  border-radius: 10px;
  box-shadow: ${({ boxshadow, theme }) => (boxshadow ? boxshadow : theme.boxshadow.primary)};

  color: ${({ theme }) => theme.colors.textPrimary};

  font-family: ${({ theme }) => theme.fontFamily.primary};
  font-size: ${({ fontSize }) => (fontSize ? fontSize : "1.2rem")};
  font-weight: ${({ fontWeight }) => fontWeight};
  padding: 0.5rem 1.25rem;
  flex-shrink: 0;

  &:hover {
    border: 2px solid #ffffff;
    border-radius: 12px;
    outline: none;
  }

  &:focus-within {
    border: 2px solid #ffffff;
    outline: 2px solid #ffffff;
    outline-offset: -2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 0.8rem;
  }
`;
