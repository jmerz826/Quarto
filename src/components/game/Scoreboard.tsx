import { useContext } from "react";
import styled from "styled-components";
import { GameContext, IGameContext } from "./Board";

const StyledScoreboard = styled.div`
  background-color: beige;
  height: 50px;
  margin: 0 20%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Scoreboard = () => {
  const { currentPlayer, movePending, isWinner } = useContext(
    GameContext
  ) as IGameContext;
  const instructionText =
    movePending === "select"
      ? `Player ${currentPlayer}, select a piece for your opponent`
      : `Player ${currentPlayer}, place your piece`;
  const winnerText = `Player ${currentPlayer} wins!`;
  return (
    <StyledScoreboard>
      <span>{isWinner ? winnerText : instructionText}</span>
    </StyledScoreboard>
  );
};

export { Scoreboard };
