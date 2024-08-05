import React from 'react'; 
import BoardView from "../../components/Board"; 
import './index.css';

function GamePage(props) {
  const { text } = props; 
  return( 
     <BoardView /> 
  );
}

export default GamePage;