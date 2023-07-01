import styled from "styled-components";
import { IPiece, Piece } from "./Piece";

const StyledPiecesTray = styled.div`
  background-color: gold;
  width: 600px;
  margin: auto;
  margin-top: 50px;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;
interface Props {
  availablePieces: IPiece[];
}
const PiecesTray = (props: Props) => {
  const { availablePieces } = props;
  return (
    <StyledPiecesTray>
      {availablePieces.map(({ color, shape, pattern, height }) => {
        return (
          <Piece
            color={color}
            shape={shape}
            pattern={pattern}
            height={height}
            key={color + shape + pattern + height}
          />
        );
      })}
    </StyledPiecesTray>
  );
};

export { PiecesTray };
