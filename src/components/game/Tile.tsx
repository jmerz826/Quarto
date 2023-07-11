import styled from "styled-components";
import { useState, DragEventHandler, useContext, useEffect } from "react";
import { Piece } from "./Piece";
import classNames from "classnames";
import { getColor, getHeight, getPattern, getShape } from "../../utils/helpers";
import { GameContext, IGameContext } from "./Board";

const StyledTile = styled.div`
  margin: 16px;
  background-color: rgba(255, 0, 0, 0.6);
  width: 125px;
  border: 2px solid gold;
  &.piece-hover {
    background-color: white;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface TileProps {
  rowId: number;
  columnId: number;
}

const Tile = (props: TileProps) => {
  const { rowId, columnId } = props;
  const { setDropLock } = useContext(GameContext) as IGameContext;
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

  useEffect(() => {
    if (pieceHover && !isOccupied) {
      setDropLock(false);
    } else {
      setDropLock(true);
    }
  }, [pieceHover, isOccupied, setDropLock]);

  const handleDrop: DragEventHandler = (e) => {
    e.preventDefault();
    let droppedElementClasses: string[] = [];
    try {
      droppedElementClasses = Object.values(
        JSON.parse(e.dataTransfer.getData("text/plain"))
      );
    } catch (e) {
      setPieceHover(false);
    }

    if (!isOccupied && droppedElementClasses.includes("piece")) {
      setIsOccupied(true);
      setOccupiedPieceClasses(droppedElementClasses);
    }
    setPieceHover(false);
  };

  return (
    <StyledTile
      className={classNames({ "piece-hover": pieceHover }, "tile")}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      data-occupied={isOccupied}
      data-row={rowId}
      data-column={columnId}
    >
      {occupiedPieceClasses && (
        <Piece
          color={getColor(occupiedPieceClasses)}
          height={getHeight(occupiedPieceClasses)}
          pattern={getPattern(occupiedPieceClasses)}
          shape={getShape(occupiedPieceClasses)}
        />
      )}
    </StyledTile>
  );
};

export { Tile };
