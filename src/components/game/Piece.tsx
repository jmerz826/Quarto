import classNames from "classnames";
import styled from "styled-components";
import { useState, DragEventHandler, useContext } from "react";
import { GameContext, IGameContext } from "./Board";

export interface IPiece {
  color: "light" | "dark";
  shape: "square" | "rounded";
  height: "tall" | "short";
  pattern: "polka-dot" | "solid";
}

const StyledPiece = styled.div`
  width: 25px;
  display: inline-block;
  border: 2px solid;
`;

const Piece = ({ color, height, shape, pattern }: IPiece) => {
  const [placed, setPlaced] = useState(false);
  const {
    setAvailablePieces,
    dropLock,
    setPieceToPlace,
    movePending,
    setMovePending,
    setCurrentPlayer,
    currentPlayer,
  } = useContext(GameContext) as IGameContext;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const draggedElement = event.target as HTMLDivElement;
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify(draggedElement.classList)
    );
  };

  const handleDrag: DragEventHandler = (e) => {
    if (!dropLock) {
      setPlaced(true);
      const currentPieceClasses = [...(e.target as HTMLElement).classList];
      setAvailablePieces((availablePieces) =>
        availablePieces.filter(
          ({ color, height, pattern, shape }) =>
            !(
              currentPieceClasses.includes(color) &&
              currentPieceClasses.includes(height) &&
              currentPieceClasses.includes(pattern) &&
              currentPieceClasses.includes(shape)
            )
        )
      );
    }
  };

  return (
    <StyledPiece
      className={classNames(color, height, shape, pattern, "piece")}
      onDragStart={handleDragStart}
      onDragEnd={handleDrag}
      draggable={!placed}
      onClick={() => {
        if (movePending === "select") {
          setPieceToPlace([color, height, shape, pattern]);
          setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
          setMovePending("place");
        }
      }}
    />
  );
};

export { Piece };
