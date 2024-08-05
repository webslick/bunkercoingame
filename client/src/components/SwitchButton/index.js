import React from 'react'; 
import './index.css';

function SwitchButton(props) {
  const { title, active, timer } = props; 
 
  return( 
    <div style={{backgroundColor: `${active ? 'rgb(255 255 255)' : 'none'}`}} className='switchButtonContainer'>
      <div className='switchButtonTitle'>{title}</div>
      {
        timer ? <div className='switchButtonTimerContainer'> 
        <div className='switchButtontime'>{timer}</div>
      </div> : <></>
      }
      
    </div>  
  );
}

export default SwitchButton;