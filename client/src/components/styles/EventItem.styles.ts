import styled, { css } from "styled-components";

interface SpanProps {
  className?: string;
  category: string;
  $gridindex?: number | null;
}

export const Container = styled.div<SpanProps>`
  background-color: ${(props) => props.category};

  ${(props) =>
    props.className === "sameday"
      ? css<SpanProps>`
          margin: 0 10px;
          border-radius: 8px;
          grid-row: ${({ $gridindex }) => $gridindex};
        `
      : props.className === "start"
      ? css<SpanProps>`
          margin-left: 10px;
          border-top-left-radius: 8px;
          border-bottom-left-radius: 8px;
          grid-row: ${({ $gridindex }) => $gridindex};
        `
      : props.className === "end"
      ? css<SpanProps>`
          margin-right: 10px;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          grid-row: ${({ $gridindex }) => $gridindex};
        `
      : css<SpanProps>`
          grid-row: ${({ $gridindex }) => $gridindex};
        `}
`;

export const Title = styled.p<{ $fontcolor: string }>`
  text-align: left;
  margin-left: 10px;
  line-height: 19px;
  font-size: 1rem;
  color: ${(props) => props.$fontcolor};
  font-family: ${({ theme }) => theme.fontFamily.primary};

  white-space: nowrap;
  max-width: 90px;
  font-size: 0.8rem;

  @media (max-width: ${({ theme }) => theme.breakpoint.small}) {
    font-size: 0.8rem;
  }

  @media (max-width: 1200px) {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 70px;
  }
`;
