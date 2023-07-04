import styled from "styled-components";
import { Row } from "./Row";
import { useState } from "react";
import { PiecesTray } from "./PiecesTray";
import { IPiece } from "./Piece";
import { generateIterations } from "./pieceMap";

const StyledBoard = styled.div`
  height: 400px;
  background-color: black;
  width: 400px;
  margin: auto;
  margin-top: 100px;
  border: 5px solid gold;
  border-radius: 4px;
`;

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
