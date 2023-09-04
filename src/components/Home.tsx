import { Board } from "./game/Board";
import { useState } from "react";
import styled from "styled-components";

const StyledStartButton = styled.button`
  background: lightgreen;
  text-transform: uppercase;
  font-size: 2rem;
  &:hover {
    cursor: pointer;
  }
  border-radius: 8px;
  border: 0.5px solid black;
  display: block;
  margin: auto;
  margin-top: 50px;
`;

const Home = () => {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <main>
      {gameStarted ? (
        <Board />
      ) : (
        <StyledStartButton onClick={() => setGameStarted(!gameStarted)}>
          start quarto
        </StyledStartButton>
      )}
    </main>
  );
};

export { Home };
