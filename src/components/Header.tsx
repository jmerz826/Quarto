import { styled } from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  background-color: beige;
  padding: 0.25rem;
  text-align: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <h1>Play Quarto!</h1>
    </StyledHeader>
  );
};

export { Header };
