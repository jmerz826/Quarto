import { useContext } from "react";
import styled from "styled-components";
import { GameContext, IGameContext } from "./Board";

const StyledScoreboard = styled.div`
  background-color: black;
  color: white;
  height: 50px;
  margin: 0 25%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 2px solid gold;
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
