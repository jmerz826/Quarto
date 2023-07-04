import styled from "styled-components";

const StyledTile = styled.div`
  margin: 16px;
  background-color: red;
  opacity: 0.6;
  width: 100px;
  border: 2px solid gold;
`;

const Tile = () => {
  return <StyledTile />;
};

export { Tile };
