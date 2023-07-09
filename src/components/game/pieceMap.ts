import { IPiece } from "./Piece";

const pieceMap: { [P in keyof IPiece]: IPiece[P][] } = {
  color: ["light", "dark"],
  height: ["short", "tall"],
  shape: ["rounded", "square"],
  pattern: ["solid", "polka-dot"],
};

const keys = Object.keys(pieceMap);
const values = Object.values(pieceMap);

function generateInitialPieces<T extends Record<keyof IPiece, string>>(
  index = 0,
  iteration: T = {} as T
): T[] {
  if (index === keys.length) {
    return [iteration];
  }

  const key = keys[index];
  const currentValues = values[index];
  const iterations: T[] = [];

  for (const value of currentValues) {
    const newIteration = { ...iteration, [key]: value };
    iterations.push(...generateInitialPieces(index + 1, newIteration));
  }

  return iterations;
}

const getStartingBoard = (numberOfRows: number) => {
  const rowArr = [];
  for (let i = 0; i < numberOfRows; i++) {
    const colArr = [];
    for (let j = 0; j < numberOfRows; j++) {
      colArr.push([]);
    }
    rowArr.push(colArr);
  }
  return rowArr;
};

const startingBoard = getStartingBoard(keys.length);

export { generateInitialPieces, startingBoard };
