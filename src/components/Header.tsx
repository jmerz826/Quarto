import { styled } from "styled-components";
import { useState } from "react";
import expandIcon from "../assets/icons/down.svg";
import classNames from "classnames";
import { Rules } from "./Rules";

const StyledHeader = styled.header`
  width: 100%;
  background-color: beige;
  padding: 0.25rem;
  text-align: center;
  /* display: flex;
  justify-content: space-between; */
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

const Header = () => {
  const [rulesExpanded, setRulesExpanded] = useState(false);

  return (
    <StyledHeader>
      <h1>Play Quarto!</h1>
      <StyledExpandButton
        onClick={() => setRulesExpanded(!rulesExpanded)}
        aria-expanded={rulesExpanded}
      >
        Rules & Objective{" "}
        <img src={expandIcon} className={classNames({ flip: rulesExpanded })} />
      </StyledExpandButton>
      {rulesExpanded && <Rules />}
    </StyledHeader>
  );
};

export { Header };
