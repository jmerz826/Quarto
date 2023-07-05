export const getColor = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses?.some((className) => className === "light")
    ? "light"
    : "dark";
export const getHeight = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses?.some((className) => className === "tall")
    ? "tall"
    : "short";
export const getPattern = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses?.some((className) => className === "polka-dot")
    ? "polka-dot"
    : "solid";
export const getShape = (occupiedPieceClasses: string[]) =>
  occupiedPieceClasses?.some((className) => className === "rounded")
    ? "rounded"
    : "square";
