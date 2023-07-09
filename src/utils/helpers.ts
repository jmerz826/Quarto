import { ValidValue } from "../components/game/types/game";

export const getColor = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses.some((className) => className === "light")
    ? "light"
    : "dark";
export const getHeight = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses.some((className) => className === "tall")
    ? "tall"
    : "short";
export const getPattern = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses.some((className) => className === "polka-dot")
    ? "polka-dot"
    : "solid";
export const getShape = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses.some((className) => className === "rounded")
    ? "rounded"
    : "square";

export const transposeArray = <T>(arr: T[][]): T[][] =>
  arr[0].map((_, columnIndex) => arr.map((row) => row[columnIndex]));

export const scanForWinner = (
  arr: ValidValue[][][],
  searchDiagonals = false
) => {
  let isWinner = false;
  if (searchDiagonals) {
    // top left to bottom right
    const mainDiagonal = arr.map((row, i) => row[i]);
    // bottom left to top right
    const secondaryDiagonal = arr.map((row, i) => row[row.length - 1 - i]);
    if (checkAttributes(mainDiagonal) || checkAttributes(secondaryDiagonal))
      isWinner = true;
  } else {
    // loop through each row
    arr.forEach((row) => {
      if (checkAttributes(row)) isWinner = true;
    });
  }
  return isWinner;
};

function checkAttributes(row: ValidValue[][]) {
  let isWinner = false;
  let winningAttributes: ValidValue[] = [];
  for (let col = 0; col < row.length; col++) {
    // unoccupied tile
    if (!row[col].length) break;
    if (
      // skip first column
      col !== 0
    ) {
      winningAttributes = winningAttributes.filter((value) =>
        row[col].includes(value)
      );
    }
    if (col === 0) {
      winningAttributes = row[col];
      continue;
    }
    if (col === row.length - 1 && winningAttributes.length) isWinner = true;
  }
  return isWinner;
}
