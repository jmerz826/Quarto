import styled from "styled-components";

const StyledUL = styled.ul`
  list-style: disc;
  list-style-position: inside;
  text-align: left;
  width: fit-content;
  margin: auto;
`;

const Rules = () => {
  return (
    <StyledUL>
      <li>
        Line up 4 <span className="italic">like</span> pieces
      </li>
      <li>
        <span className="italic">like pieces</span> is defined by matching in
        height, color, surface (polka-dot vs. solid), or shape (square vs.
        rounded)
      </li>
      <li>
        You must place your piece, then choose a piece for your opponent to
        place
      </li>
    </StyledUL>
  );
};

export { Rules };
