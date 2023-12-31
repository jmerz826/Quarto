import styled from "styled-components";
import { Piece } from "./Piece";
import { useContext } from "react";
import { GameContext, IGameContext } from "./Board";
import classNames from "classnames";

const StyledPiecesTray = styled.div`
  background-color: gold;
  width: 800px;
  margin: auto;
  margin-top: 24px;
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  padding: 0 10px;
  .piece {
    margin: 10px auto;
    cursor: pointer;
  }
  &.place-piece {
    .piece:hover {
      cursor: grab;
    }
    .piece:active {
      cursor: grabbing;
    }
  }
`;

const PiecesTray = () => {
  const { availablePieces, pieceToPlace, isWinner } = useContext(
    GameContext
  ) as IGameContext;

  return (
    <StyledPiecesTray
      id="pieces-tray"
      className={classNames({ "place-piece": !!pieceToPlace })}
    >
      {!isWinner &&
        availablePieces.map(({ color, shape, pattern, height }) => {
          const isPieceToPlace = () =>
            pieceToPlace &&
            pieceToPlace.includes(color) &&
            pieceToPlace.includes(shape) &&
            pieceToPlace.includes(pattern) &&
            pieceToPlace.includes(height);

          return !pieceToPlace ? (
            <Piece
              color={color}
              shape={shape}
              pattern={pattern}
              height={height}
              key={color + shape + pattern + height}
            />
          ) : (
            isPieceToPlace() && (
              <Piece
                color={color}
                shape={shape}
                pattern={pattern}
                height={height}
                key={color + shape + pattern + height}
              />
            )
          );
        })}
    </StyledPiecesTray>
  );
};

export { PiecesTray };
