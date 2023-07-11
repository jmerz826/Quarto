import { useContext } from "react";
import styled from "styled-components";
import { GameContext, IGameContext } from "./Board";

const StyledScoreboard = styled.div`
  background-color: beige;
  height: 50px;
`;

const StyledWinnerText = styled.p`
  text-align: center;
  line-height: 50px;
  margin: 0;
`;

const Scoreboard = () => {
  const { currentPlayer, movePending, isWinner } = useContext(
    GameContext
  ) as IGameContext;
  const instructionText =
    movePending === "select" ? (
      <span>Player {currentPlayer}, select a piece for your opponent</span>
    ) : (
      <span>Player {currentPlayer}, place your piece</span>
    );
  const winnerText = (
    <StyledWinnerText>Player {currentPlayer} wins!</StyledWinnerText>
  );
  return (
    <StyledScoreboard>
      {isWinner ? winnerText : instructionText}
    </StyledScoreboard>
  );
};

export { Scoreboard };
