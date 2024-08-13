import React from 'react';
import './index.css'; 

function JoinButton(props) {
  const { title, img, onCLick } = props;  
  return(
    <div  onClick={(e) => (onCLick(e))} className='JoinButtonContainer'> 
      <img className='joinimg' src={img} />
      <div className='JoinButtonTitle'>{title}</div>  
    </div>
  );
}

export default JoinButton;
 