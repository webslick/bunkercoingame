import React, { useState } from "react";
import Tile from "../Tile";
import Cell from "../Cell";
import { Board } from "../../helper";
import useEvent from "../../hooks/useEvent";
import GameOverlay from "../GameOverlay";
import GetButton from "../GetButton";
import JoinButton from "../JoinButton";
import images from "../../assets/images";
import './index.css';

const BoardView = () => {

  const [board, setBoard] = useState(new Board());
  const {teher,telega,love} = images;
  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
  };

  return (
    <div className="boardViewContainer">
      <div className='boardViewTopContainer'>  
        <JoinButton title="Join" img={ telega } url="https://t.me/+79139169290" />    
        <GetButton title="Invite Buddies"  fill={!false} invite={true} /> 
      </div>
      <div className="details_box">
        <div className="left_box" > 
          <div className="infoButtonWrapper" >
            <div className="resetButtonTop"> 
                2048 
            </div>
            <div className="resetButtonBottom"> 
                40000 
              <img style={{ width: '18px', height:' 18px', marginLeft: '5px'}} src={teher} />
            </div> 
          </div>
        </div>
        <div className="rigth_box" >
          <div className="score-box">
            <div className="scoreBoxTop" >
             Score:
            </div>
            <div className="scoreBoxBottom" >
             {board.score}
            </div>
          </div>
          <div className="score-box">
            <div className="scoreBoxTop" >
             Your mine:
            </div>
            <div className="scoreBoxBottom" >
            {board.score}
            <img style={{ width: '18px', height:' 18px', marginLeft: '5px'}} src={teher} />
            </div>
          </div>
 
        </div> 
      </div>
      <div className="board">
        {cells}
        {tiles}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </div>
  );
};

export default BoardView;
