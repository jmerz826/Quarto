import classNames from "classnames";
import styled from "styled-components";
import { useState, DragEventHandler, useContext } from "react";
import { AvailablePiecesContext, IAvailablePieces } from "./Board";

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
  const [placed, setPlaced] = useState(false);
  const { availablePieces, setAvailablePieces } = useContext(
    AvailablePiecesContext
  ) as IAvailablePieces;

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    const draggedElement = event.target as HTMLDivElement;
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify(draggedElement.classList)
    );
  };

  const handleDrag: DragEventHandler = (e) => {
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
  };

  return (
    <StyledPiece
      className={classNames(color, height, shape, pattern, "piece")}
      onDragStart={handleDragStart}
      onDragEnd={handleDrag}
      draggable={!placed}
    />
  );
};

export { Piece };
