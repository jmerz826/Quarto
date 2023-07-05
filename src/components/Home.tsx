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
  const [gameStarted, setGameStarted] = useState(true);
  return (
    <main>
      <h1>Quarto</h1>
      <h2>Rules & Objective</h2>
      <ul>
        <li>
          Line up 4 <span className="italic">like</span> pieces
        </li>
        <li>
          <span className="italic">like pieces</span> is defined by matching in
          height, color, surface (polka-dot vs. solid), or shape (square vs.
          rounded)
        </li>
        <li>
          You must place your piece, then choose a piece for your opponent to
          place
        </li>
      </ul>
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
