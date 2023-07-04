import styled from "styled-components";
import { Tile } from "./Tile";
const StyledRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
`;

const Row = () => {
  return (
    <StyledRow>
      <Tile></Tile>
      <Tile></Tile>
      <Tile></Tile>
      <Tile></Tile>
    </StyledRow>
  );
};

export { Row };
