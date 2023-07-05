import styled from "styled-components";
import { useState, DragEventHandler, useContext } from "react";
import { AvailablePiecesContext, IAvailablePieces } from "./Board";
import { IPiece, Piece } from "./Piece";

const StyledTile = styled.div`
  margin: 16px;
  background-color: red;
  opacity: 0.6;
  width: 100px;
  border: 2px solid gold;
  &.piece-hover {
    background-color: white;
  }
`;

const Tile = () => {
  const { availablePieces, setAvailablePieces } = useContext(
    AvailablePiecesContext
  ) as IAvailablePieces;
  const [isOccupied, setIsOccupied] = useState(false);
  const [pieceHover, setPieceHover] = useState(false);
  const [occupiedPieceClasses, setOccupiedPieceClasses] = useState<
    undefined | string[]
  >(undefined);

  const handleDragOver: DragEventHandler = (e) => e.preventDefault();

  const handleDragEnter: DragEventHandler = (e) => {
    e.preventDefault();
    setPieceHover(true);
  };
  const handleDragLeave: DragEventHandler = () => {
    setPieceHover(false);
  };

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    const droppedElementClasses: string[] = Object.values(
      JSON.parse(e.dataTransfer.getData("text/plain"))
    );

    console.log(droppedElementClasses);
    if (!isOccupied) {
      setIsOccupied(true);
      setOccupiedPieceClasses(droppedElementClasses);
    }
  };

  const getColor = () =>
    occupiedPieceClasses?.some((className) => className === "light")
      ? "light"
      : "dark";
  const getHeight = () =>
    occupiedPieceClasses?.some((className) => className === "tall")
      ? "tall"
      : "short";
  const getPattern = () =>
    occupiedPieceClasses?.some((className) => className === "polka-dot")
      ? "polka-dot"
      : "solid";
  const getShape = () =>
    occupiedPieceClasses?.some((className) => className === "rounded")
      ? "rounded"
      : "square";

  return (
    <StyledTile
      className={pieceHover ? "piece-hover" : ""}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-occupied={isOccupied}
    >
      {occupiedPieceClasses && (
        <Piece
          color={getColor()}
          height={getHeight()}
          pattern={getPattern()}
          shape={getShape()}
        />
      )}
    </StyledTile>
  );
};

export { Tile };
