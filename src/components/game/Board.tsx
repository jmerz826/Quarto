import styled from "styled-components";
import { Row } from "./Row";
import { useState, createContext, ReactNode, useMemo, useEffect } from "react";
import { PiecesTray } from "./PiecesTray";
import { IPiece } from "./Piece";
import { generateInitialPieces, validValues, startingBoard } from "./pieceMap";
import { scanForWinner, transposeArray } from "../../utils/helpers";

const StyledBoard = styled.div`
  height: 400px;
  background-color: black;
  width: 400px;
  margin: auto;
  margin-top: 100px;
  border: 5px solid gold;
  border-radius: 4px;
`;

export interface IAvailablePieces {
  availablePieces: IPiece[];
  setAvailablePieces: React.Dispatch<React.SetStateAction<IPiece[]>>;
  dropLock: boolean;
  setDropLock: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IContextProviderProps {
  children?: ReactNode;
}

const AvailablePiecesContext = createContext<IAvailablePieces | undefined>(
  undefined
);

const AvailablePiecesContextProvider = (props: IContextProviderProps) => {
  const { children } = props;
  const [availablePieces, setAvailablePieces] = useState<IPiece[]>(
    generateInitialPieces()
  );
  const [dropLock, setDropLock] = useState(false);
  const [isWinner, setWinner] = useState(false);
  const [boardMap, setBoardMap] = useState<any[]>(startingBoard);

  const memoizedValue = useMemo(
    () => ({
      availablePieces,
      setAvailablePieces,
    }),
    [availablePieces]
  );

  useEffect(() => {
    const occupiedTiles = [
      ...document.querySelectorAll("#game-board [data-occupied=true]"),
    ];

    occupiedTiles.forEach((tile) => {
      const row = Number(tile.getAttribute("data-row") as unknown as string);
      const column = Number(
        tile.getAttribute("data-column") as unknown as string
      );
      const occupyingPieceClasses = [
        ...(tile.firstChild as HTMLElement).classList,
      ].filter((className) =>
        validValues.includes(className as (typeof validValues)[number])
      );
      // update boardMap state if newly occupied piece
      if (!boardMap[row][column].length) {
        setBoardMap((prevState) => {
          const newState = [...prevState];
          newState[row] = [...newState[row]];
          newState[row][column] = occupyingPieceClasses;
          return newState;
        });
      }
      if (scanForWinner(boardMap) || scanForWinner(transposeArray(boardMap)))
        setWinner(true);
    });
  }, [availablePieces, boardMap]);

  // winner display
  useEffect(() => {
    if (isWinner) alert("winner!");
  }, [isWinner]);

  return (
    <AvailablePiecesContext.Provider
      value={{ ...memoizedValue, dropLock, setDropLock }}
    >
      {children}
    </AvailablePiecesContext.Provider>
  );
};

const Board = () => {
  return (
    <AvailablePiecesContextProvider>
      <StyledBoard id="game-board">
        <Row rowId={0} />
        <Row rowId={1} />
        <Row rowId={2} />
        <Row rowId={3} />
      </StyledBoard>
      <PiecesTray />
    </AvailablePiecesContextProvider>
  );
};

export { Board, AvailablePiecesContext };
