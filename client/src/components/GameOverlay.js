import React, { useEffect } from "react";
import TryAgainLogo from "../assets/images/1024tile.png";

const GameOverlay = ({ onRestart, board }) => {
 
    if (board.hasWon()) {
      
      return <div className="tile2048"></div>;
    } else if (board.hasLost()) { 
      return (
        <div className="gameOver" onClick={onRestart}>
          <img
            src={TryAgainLogo}
            alt="Inténtalo de nuevo!!"
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
            }}
          />
        </div>
      );
    }

    return null;
 
 
};

export default GameOverlay;