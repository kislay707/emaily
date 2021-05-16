import React, { useState, useEffect, useMemo } from "react";
import styled, {keyframes} from "styled-components";
import { findList } from "../utils/utils";
import WinningScreen from "./WinningScreen";
import useSound from 'use-sound';
import play1 from '../sound/pop-up-off.mp3';
import play2 from '../sound/pop-up-on.mp3';

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
  opacity: 1;
  width: 400px;
  height: 400px;
`;

const Score = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
`;

const PlayingAreaContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTile = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  cursor: default;
  position: absolute;
  top: ${props => (props.top ? `${props.top * (size)}px` : 0)};
  left: ${props => (props.left ? `${props.left * (size)}px` : 0)};
  height: ${size}px;
  width: ${size}px;
  transition: background-color 1s ease;
  background-color: ${props => {
    if (props.owner === -1) {
      return "rgba(250, 0, 0, 0.5)";
    } else if (props.owner === 0) {
      return "#14bdac";
    } else {
      return "#46d7ff";
    }
  }};
  box-sizing: border-box;
  padding: 2px;
  background-clip: content-box;
  border: black solid 1px;
  border-width: 0px;
  &:hover {
    padding: 0px;
   box-sizing: border-box;
  }
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
  const [currentAge, setCurrentAge] = useState(1);

  const [dummy, setDummy] = useState(0);
  const [playerSound] = useSound(play1)
  const [opponentPlayerSound] = useSound(play2)

  const socket = props.socket;

  useEffect(() => {
    if (props.opponentSwitch !== -1) {
      console.log(`opponenct clicked at ${props.opponentSwitch}`);
      handleOpponentTileClick(props.opponentSwitch);
    }
  }, [props.opponentSwitch]);

  const handleTileClick = index => {
    if (
      tiles[index].owner === -1 &&
      currentPlayer === props.gameData.position
    ) {
      playerSound();
      tiles[index].owner = currentPlayer;
      tiles[index].age = currentAge;
      const nextPlayer = currentPlayer === 0 ? 1 : 0;
      setCurrentPlayer(nextPlayer);
      setCurrentAge(currentAge + 1);
      
      if (socket) {
        socket.emit("updatePosition", {
          index: index,
          opponent: props.gameData.opponent
        });
      }

      setTimeout(() => {
        console.log("first setTimeout called");
        const list = findList(nextPlayer, tiles, count, currentAge, opponentPlayerSound);
        
        setDummy((dummy) => {
          return dummy + 1;
        })
      }, 500)
    }
  };

  const handleOpponentTileClick = index => {
    if (tiles[index].owner === -1) {
      opponentPlayerSound();
      tiles[index].owner = currentPlayer;
      tiles[index].age = currentAge;

      const nextPlayer = currentPlayer === 0 ? 1 : 0;
      setCurrentPlayer(nextPlayer);
      setCurrentAge(currentAge + 1);

      setTimeout(() => {
        console.log("second setTimeout called");
        const list = findList(nextPlayer, tiles, count, currentAge, opponentPlayerSound);
        
        setDummy((dummy) => {
          return dummy + 1;
        })
      }, 500)
      
    }
  };

  const {sum, opponentSum, unPlayedCount} = useMemo(() => {
    let sum = 0;
    let opponentSum = 0;
    let unPlayedCount = 0; 
    tiles.forEach((tile) => {
      if (tile.owner === props.gameData.position) {
        sum += tile.age;
      } else {
        opponentSum += tile.age;
      }
      if (tile.owner === -1) {
        unPlayedCount++;
      }
    })
    if (unPlayedCount === 0) {
      if (currentPlayer === props.gameData.position) {
        opponentSum = opponentSum + currentAge;
      } else {
        sum = sum + currentAge;
      }
    }
    return {sum, opponentSum, unPlayedCount};
  }, [tiles,currentPlayer, props, dummy])
  
  return (
    <div>
      <div>You are : {props.gameData.position === 0 ? "green" : "blue"} </div>
      <div>Current Player : {currentPlayer === 0 ? "green" : "blue"}</div>
      <div>Current Age : {currentAge}</div>
      <div>{dummy> -1 ? '' : ""}</div>
      <Score>
        <div>Your score : {sum} </div>
        <div>Opponent score : {opponentSum} </div>
      </Score> 
      {unPlayedCount <= 0 && 
          <WinningScreen sum={sum} opponentSum={opponentSum} position={props.gameData.position} >
          </WinningScreen>}
        <PlayingAreaContainer>
          <YouContainer> 
            <AnimationDiv highlight={currentPlayer === props.gameData.position ? true : false}></AnimationDiv>
            <YouDescription color={props.gameData.position === 0 ? "green" : "blue"}>
              <YouSubDescription>
                YOU
              </YouSubDescription>
              </YouDescription>
            <YouScore>Score: {sum}</YouScore>
          </YouContainer>
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
                >{tile.owner !== -1 && tile.age}</StyledTile>
              );
            })}
          </TileContainer>
          <OpponentContainer>
            <AnimationDiv highlight={currentPlayer === props.gameData.position ? false : true}></AnimationDiv>
            <OpponentDescription color={props.gameData.position === 0 ? "blue" : "green"}>
              <OpponentSubDescription>
              OPPONENT
              </OpponentSubDescription>
            </OpponentDescription>
            <OpponentScore>Score : {opponentSum} </OpponentScore>
          </OpponentContainer>
        </PlayingAreaContainer>
        
      
    </div>
  );
}


const Animation = keyframes`
0% { height: 1px }
25%  { height: 13px }
50%  { height: 26px }
75%  { height: 13x }
100% { height: 1px }
`;

const AnimationDiv = styled.div`
  position:absolute;
  width: 100%;
  background-color: rgba(250,0,0,0.5);
  display: ${props => (props.highlight ? `block` : `none`)};
  animation: ${Animation} 1s linear;
  animation-iteration-count: infinite;
`;

const YouContainer = styled.div`
  width: 120px;
  margin: 40px;
  position:relative;
  
`;

const YouDescription = styled.div`
border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
box-shadow: 0 3px 0 0 #14bdac;
box-shadow: ${props => (props.color === 'green' ? `0 3px 0 0 #14bdac` : `0 3px 0 0 #46d7ff`)};
margin-bottom: 25px;
`;

const YouSubDescription = styled.div`
height:100%; 
box-shadow: 0 4px 5px rgb(0 0 0 / 16%);
padding:4px;
display: flex;
justify-content: center;
`;

const YouScore = styled.div`
display: flex;
justify-content: center;
`;

const OpponentContainer = styled.div`
width: 120px;
margin: 40px;
position:relative;
`;

const OpponentDescription = styled.div`
border-bottom-right-radius: 3px;
border-bottom-left-radius: 3px;
box-shadow: ${props => (props.color === 'green' ? `0 3px 0 0 #14bdac` : `0 3px 0 0 #46d7ff`)};
margin-bottom: 25px;
`;

const OpponentSubDescription = styled.div`
height:100%; 
box-shadow: 0 4px 5px rgb(0 0 0 / 16%);
padding:4px;
display: flex;
justify-content: center;
`;
const OpponentScore = styled.div`
display: flex;
justify-content: center;
`;



export default Board;
