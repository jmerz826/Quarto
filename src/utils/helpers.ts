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

export const scanForWinner = (arr: any[]) => {
  let isWinner = false;
  arr.forEach((row) => {
    // loop through each row
    let winningAttributes: string[] = [];
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
  });
  return isWinner;
};
