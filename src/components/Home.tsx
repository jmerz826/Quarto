import { Board } from "./game/Board";
import { useState } from "react";
import styled from "styled-components";
import expandIcon from "../assets/icons/down.svg";
import classNames from "classnames";

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

const StyledExpandButton = styled.button`
  background: transparent;
  border: none;
  display: inline-flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  img {
    width: 1rem;
    vertical-align: middle;
  }
  img.flip {
    transform: rotateX(180deg);
  }
`;

const Home = () => {
  const [gameStarted, setGameStarted] = useState(true);
  const [rulesExpanded, setRulesExpanded] = useState(true);
  return (
    <main>
      <h2>
        Rules & Objective{" "}
        <StyledExpandButton
          onClick={() => setRulesExpanded(!rulesExpanded)}
          aria-expanded={rulesExpanded}
        >
          <img
            src={expandIcon}
            className={classNames({ flip: rulesExpanded })}
          />
        </StyledExpandButton>
      </h2>
      {rulesExpanded && (
        <ul>
          <li>
            Line up 4 <span className="italic">like</span> pieces
          </li>
          <li>
            <span className="italic">like pieces</span> is defined by matching
            in height, color, surface (polka-dot vs. solid), or shape (square
            vs. rounded)
          </li>
          <li>
            You must place your piece, then choose a piece for your opponent to
            place
          </li>
        </ul>
      )}
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
