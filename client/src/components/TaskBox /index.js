import React from 'react'; 
import images from '../../assets/images'; 
import './index.css';
 
function TaskBox(props) {
  const { title, number, onClick} = props; 
  const { arrow, teher } = images; 
   
  return( 
      <div className="taskBoxContainer" onClick={(e) => (onClick(e))}>  
        <div className='taskBoxNumberContainer'>
          <div className='taskBoxNumber'>
            <div className='taskBoxNumberTitle'>{number}</div>
          </div>
        </div>
        <div className='taskBoxTitleContainer'>
          <div className='taskBoxTitle'>{title}</div> 
        </div> 
        <div className='taskBoxArrowContainer'>
          <img className='arrowImg' src={arrow} />
        </div>  
      </div>   
  );
}

export default TaskBox;