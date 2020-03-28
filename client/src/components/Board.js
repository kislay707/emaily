import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { findXY, findIndex, findList } from "../utils/utils";

const count = 8;
const size = 50;
const Tile = function(x, y, owner, status, index) {
  this.x = x;
  this.y = y;
  this.owner = owner;
  this.status = status;
  this.index = index;
  this.age = 0;
};

const tiles = [];

const TileContainer = styled.div`
  position: relative;
`;

const StyledTile = styled.div`
  position: absolute;
  top: ${props => (props.top ? `${props.top * (size + 2)}px` : 0)};
  left: ${props => (props.left ? `${props.left * (size + 2)}px` : 0)};
  height: ${size}px;
  width: ${size}px;
  background-color: ${props => {
    if (props.owner === -1) {
      return "rgba(250, 0, 0, 1)";
    } else if (props.owner === 0) {
      return "rgba(0, 250, 0, 1)";
    } else {
      return "rgba(0, 0, 250, 1)";
    }
  }};
  margin: 2px;
`;
let indexTile = 0;
for (var i = 0; i < count; i++) {
  for (var j = 0; j < count; j++) {
    tiles.push(new Tile(j, i, -1, -1, indexTile));
    indexTile++;
  }
}

function Board(props) {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [currentAge, setCurrentAge] = useState(0);

  const [position, setPosition] = useState(props.gameData.position);
  const opponent = props.gameData.opponent;

  useEffect(() => {
    setPosition(props.gameData.position);
  }, [props.gameData.position]);
  //   if (position) {
  //       set
  //   }
  const [opponentSwitch, setOpponentSwitch] = useState(false);

  const socket = props.socket;

  useEffect(() => {
    if (props.opponentSwitch !== -1) {
      console.log(`opponenct clicked at ${props.opponentSwitch}`);
      //setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
      handleTileClick2(props.opponentSwitch, currentPlayer === 0 ? 1 : 0);
    }
  }, [props.opponentSwitch]);

  const handleTileClick = (index, alt) => {
    // let temp;
    // if (alt) {
    //   temp = alt;
    // } else {
    //   temp = currentPlayer;
    // }
    if (tiles[index].owner === -1 && currentPlayer === position) {
      tiles[index].owner = currentPlayer;
      tiles[index].age = currentAge;
      const nextPlayer = currentPlayer === 0 ? 1 : 0;
      setCurrentPlayer(nextPlayer);
      setCurrentAge(currentAge + 1);
      const list = findList(nextPlayer, tiles, count, currentAge);
      if (socket) {
        socket.emit("updatePosition", { index: index, opponent: opponent });
      }
    }
  };

  const handleTileClick2 = (index, alt) => {
    let temp = currentPlayer === 0 ? 1 : 0;

    // let a = position === 0 ? 1 : 0;
    // setPosition(a);
    if (tiles[index].owner === -1) {
      tiles[index].owner = currentPlayer;
      tiles[index].age = currentAge;
      const nextPlayer = currentPlayer === 0 ? 1 : 0;
      setCurrentPlayer(nextPlayer);
      setCurrentAge(currentAge + 1);
      const list = findList(nextPlayer, tiles, count, currentAge);
      if (socket) {
        socket.emit("updatePosition", { index: index, opponent: opponent });
      }
    }
  };

  return (
    <div>
      <div>Current Player : {currentPlayer === 0 ? "green" : "blue"}</div>
      <div>Current Age : {currentAge}</div>
      <TileContainer>
        {tiles.map((tile, index) => {
          return (
            <StyledTile
              onClick={() => {
                handleTileClick(index);
              }}
              key={index}
              left={tile.x}
              top={tile.y}
              status={tile.status}
              owner={tile.owner}
            ></StyledTile>
          );
        })}
      </TileContainer>
    </div>
  );
}

export default Board;
