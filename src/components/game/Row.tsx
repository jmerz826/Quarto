import styled from "styled-components";
import { Tile } from "./Tile";
const StyledRow = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
`;

interface RowProps {
  rowId: number;
}
const Row = (props: RowProps) => {
  const { rowId } = props;
  return (
    <StyledRow>
      <Tile rowId={rowId} columnId={1} />
      <Tile rowId={rowId} columnId={2} />
      <Tile rowId={rowId} columnId={3} />
      <Tile rowId={rowId} columnId={4} />
    </StyledRow>
  );
};

export { Row };
