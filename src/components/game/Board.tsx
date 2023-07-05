import styled from "styled-components";
import { Row } from "./Row";
import { useState, createContext, ReactNode, useMemo } from "react";
import { PiecesTray } from "./PiecesTray";
import { IPiece } from "./Piece";
import { generateInitialPieces } from "./pieceMap";

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

  const memoizedValue = useMemo(
    () => ({
      availablePieces,
      setAvailablePieces,
    }),
    [availablePieces]
  );

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
      <StyledBoard>
        <Row rowId={1} />
        <Row rowId={2} />
        <Row rowId={3} />
        <Row rowId={4} />
      </StyledBoard>
      <PiecesTray />
    </AvailablePiecesContextProvider>
  );
};

export { Board, AvailablePiecesContext };
