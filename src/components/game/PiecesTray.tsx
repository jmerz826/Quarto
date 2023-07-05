import styled from "styled-components";
import { Piece } from "./Piece";
import { useContext } from "react";
import { AvailablePiecesContext, IAvailablePieces } from "./Board";

const StyledPiecesTray = styled.div`
  background-color: gold;
  width: 600px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

const PiecesTray = () => {
  const { availablePieces } = useContext(
    AvailablePiecesContext
  ) as IAvailablePieces;
  return (
    <StyledPiecesTray>
      {availablePieces.map(({ color, shape, pattern, height }) => {
        return (
          <Piece
            color={color}
            shape={shape}
            pattern={pattern}
            height={height}
            key={color + shape + pattern + height}
          />
        );
      })}
    </StyledPiecesTray>
  );
};

export { PiecesTray };
