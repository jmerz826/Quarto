import styled from "styled-components";

const StyledTile = styled.div`
  margin: 16px;
  background-color: red;
  opacity: 0.6;
  width: 100px;
`;

const Tile = () => {
  return <StyledTile />;
};

export { Tile };
