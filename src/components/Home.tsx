import { Board } from "./game/Board";

const Home = () => {
  return (
    <main>
      <h1>Quarto</h1>
      <h2>Rules & Objective</h2>
      <ul>
        <li>
          Line up 4 <span className="italic">like</span> pieces
        </li>
        <li>
          <span className="italic">like pieces</span> is defined by matching in
          height, color, surface (flat vs. hole), or shape (square vs. circular)
        </li>
        <li>
          You must place your piece, then choose a piece for your opponent to
          place
        </li>
      </ul>
      <Board />
    </main>
  );
};

export { Home };
