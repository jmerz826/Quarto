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
  height: 600px;
  background-color: black;
  width: 600px;
  margin: auto;
  margin-top: 50px;
  border: 5px solid gold;
  border-radius: 4px;
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
  const [isWinner, setWinner] = useState(false);
  const [boardMap, setBoardMap] = useState(startingBoard);
  const [currentPlayer, setCurrentPlayer] = useState<1 | 2>(1);

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
    if (scanBoardForWinner(boardMap)) setWinner(true);
  }, [availablePieces, boardMap]);

  // winner display
  useEffect(() => {
    if (isWinner) alert("winner!");
  }, [isWinner]);

  return (
    <GameContext.Provider
      value={{
        ...memoizedValue,
        dropLock,
        setDropLock,
        currentPlayer,
        setCurrentPlayer,
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
