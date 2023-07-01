import styled from "styled-components";
import { Row } from "./Row";
import { useState } from "react";
import { PiecesTray } from "./PiecesTray";
import { IPiece, Piece } from "./Piece";
import { pieceMap } from "./pieceMap";

const StyledBoard = styled.div`
  height: 400px;
  background-color: black;
  width: 400px;
  margin: auto;
  margin-top: 100px;
  border: 5px solid gold;
  border-radius: 4px;
`;

const keys = Object.keys(pieceMap);
const values = Object.values(pieceMap);

function generateIterations<T extends Record<keyof IPiece, string>>(
  index = 0,
  iteration: T = {} as T
): T[] {
  if (index === keys.length) {
    return [iteration];
  }

  const key = keys[index];
  const currentValues = values[index];
  const iterations: T[] = [];

  for (const value of currentValues) {
    const newIteration = { ...iteration, [key]: value };
    iterations.push(...generateIterations(index + 1, newIteration));
  }

  return iterations;
}

const Board = () => {
  const [availablePieces, setAvailablePieces] = useState<IPiece[]>(
    generateIterations()
  );

  return (
    <>
      <StyledBoard>
        <Row />
        <Row />
        <Row />
        <Row />
      </StyledBoard>
      <PiecesTray availablePieces={availablePieces} />
    </>
  );
};

export { Board };
