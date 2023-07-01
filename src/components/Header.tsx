import { styled } from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background-color: beige;
  padding: 1rem;
`;

const Header = () => {
  return <StyledHeader>Play Quarto!</StyledHeader>;
};

export { Header };
