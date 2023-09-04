import styled from "styled-components";
import { Row } from "./Row";
import { useState, createContext, ReactNode, useMemo, useEffect } from "react";
import { PiecesTray } from "./PiecesTray";
import { IPiece } from "./Piece";
import { generateInitialPieces, validValues, startingBoard } from "./pieceMap";
import { scanBoardForWinner } from "../../utils/helpers";
import { ValidValue } from "./types/game";
import { Scoreboard } from "./Scoreboard";

const StyledBoard = styled.div`
  aspect-ratio: 1 / 1;
  background-color: black;
  /* max-width: 500px; */
  max-height: 75vh;
  margin: auto;
  margin-top: 50px;
  border: 5px solid gold;
  border-radius: 4px;
  padding: 1%;
`;

export interface IGameContext {
  availablePieces: IPiece[];
  setAvailablePieces: React.Dispatch<React.SetStateAction<IPiece[]>>;
  dropLock: boolean;
  setDropLock: React.Dispatch<React.SetStateAction<boolean>>;
  currentPlayer: 1 | 2;
  setCurrentPlayer: React.Dispatch<
    React.SetStateAction<IGameContext["currentPlayer"]>
  >;
  movePending: "select" | "place";
  setMovePending: React.Dispatch<
    React.SetStateAction<IGameContext["movePending"]>
  >;
  pieceToPlace: undefined | ValidValue[];
  setPieceToPlace: React.Dispatch<
    React.SetStateAction<IGameContext["pieceToPlace"]>
  >;
  isWinner: boolean;
  setIsWinner: React.Dispatch<React.SetStateAction<IGameContext["isWinner"]>>;
}

interface IContextProviderProps {
  children?: ReactNode;
}

const GameContext = createContext<IGameContext | undefined>(undefined);

const GameContextProvider = (props: IContextProviderProps) => {
  const { children } = props;
  const [availablePieces, setAvailablePieces] = useState<IPiece[]>(
    generateInitialPieces()
  );
  const [dropLock, setDropLock] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [boardMap, setBoardMap] = useState(startingBoard);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);
  const [movePending, setMovePending] = useState<"select" | "place">("select");
  const [pieceToPlace, setPieceToPlace] = useState<undefined | ValidValue[]>();

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
      const occupyingPieceClasses = (
        [
          ...(tile.firstChild as HTMLElement).classList,
        ] as unknown as ValidValue[]
      ).filter((className) => validValues.includes(className));
      // update boardMap state if newly occupied piece
      if (!boardMap[row][column].length) {
        setBoardMap((prevState) => {
          const newState = [...prevState];
          newState[row] = [...newState[row]];
          newState[row][column] = occupyingPieceClasses;
          return newState;
        });
      }
    });
    if (scanBoardForWinner(boardMap)) setIsWinner(true);
  }, [availablePieces, boardMap]);

  return (
    <GameContext.Provider
      value={{
        ...memoizedValue,
        dropLock,
        setDropLock,
        currentPlayer,
        setCurrentPlayer,
        movePending,
        setMovePending,
        pieceToPlace,
        setPieceToPlace,
        isWinner,
        setIsWinner,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const Board = () => {
  return (
    <GameContextProvider>
      <Scoreboard />
      <StyledBoard id="game-board">
        <Row rowId={0} />
        <Row rowId={1} />
        <Row rowId={2} />
        <Row rowId={3} />
      </StyledBoard>
      <PiecesTray />
    </GameContextProvider>
  );
};

export { Board, GameContext };
