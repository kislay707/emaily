import React, { useState } from "react";
import Board from "./Board";

function Game(props) {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div onClick={() => setCounter(counter + 1)}>hello</div>{" "}
      <div>{counter}</div>
      <Board />
    </div>
  );
}

export default Game;
