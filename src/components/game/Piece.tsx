import classNames from "classnames";
import styled from "styled-components";
export interface IPiece {
  color: "light" | "dark";
  shape: "square" | "rounded";
  height: "tall" | "short";
  pattern: "polka-dot" | "solid";
}

const StyledPiece = styled.div`
  width: 20px;
  display: inline-block;
  border: 2px solid;
`;

const Piece = ({ color, height, shape, pattern }: IPiece) => {
  return (
    <StyledPiece
      className={classNames(color, height, shape, pattern, "piece")}
    />
  );
};

export { Piece };
