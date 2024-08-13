import React from "react"; 
import BoardView from "../../components/Board";  
import './index.css';

function GamePage(props) {
  const { tg, appInfo, miningInfo } = props;   
  
  return( 
     <BoardView tg={tg} appInfo={appInfo} miningInfo={miningInfo} /> 
  );
}

export default GamePage;