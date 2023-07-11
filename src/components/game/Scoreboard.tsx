import { useContext } from "react";
import styled from "styled-components";
import { GameContext, IGameContext } from "./Board";

const StyledScoreboard = styled.div`
  background-color: beige;
  height: 50px;
`;

const Scoreboard = () => {
  const { currentPlayer } = useContext(GameContext) as IGameContext;
  return (
    <StyledScoreboard>
      <span>Player {currentPlayer}, select a piece for your opponent</span>
    </StyledScoreboard>
  );
};

export { Scoreboard };
