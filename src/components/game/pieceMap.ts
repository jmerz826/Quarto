import { IPiece } from "./Piece";

const pieceMap: { [P in keyof IPiece]: IPiece[P][] } = {
  color: ["light", "dark"],
  height: ["short", "tall"],
  shape: ["rounded", "square"],
  pattern: ["solid", "striped"],
};

const keys = Object.keys(pieceMap);
const values = Object.values(pieceMap);

function generateIterations<T extends Record<keyof IPiece, string>>(
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
    iterations.push(...generateIterations(index + 1, newIteration));
  }

  return iterations;
}

export { generateIterations };
