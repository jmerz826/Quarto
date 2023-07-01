import { IPiece } from "./Piece";

const pieceMap: { [P in keyof IPiece]: IPiece[P][] } = {
  color: ["light", "dark"],
  height: ["short", "tall"],
  shape: ["rounded", "square"],
  pattern: ["solid", "striped"],
};

export { pieceMap };
