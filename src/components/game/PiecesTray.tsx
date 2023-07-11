import styled from "styled-components";
import { Piece } from "./Piece";
import { useContext } from "react";
import { GameContext, IGameContext } from "./Board";

const StyledPiecesTray = styled.div`
  background-color: gold;
  width: 800px;
  margin: auto;
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 10px;
`;

const PiecesTray = () => {
  const { availablePieces } = useContext(GameContext) as IGameContext;
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
