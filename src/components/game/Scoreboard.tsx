import { useContext } from "react";
import styled from "styled-components";
import { GameContext, IGameContext } from "./Board";

const StyledScoreboard = styled.div`
  background-color: beige;
  height: 50px;
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
  return (
    <StyledScoreboard>
      {!isWinner ? instructionText : <span>Player {currentPlayer} wins!</span>}
    </StyledScoreboard>
  );
};

export { Scoreboard };
