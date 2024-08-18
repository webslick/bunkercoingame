import React from 'react';
import './index.css'; 

function JoinButton(props) {
  const { title, img, onClick } = props;  
  return(
    <div  onClick={(e) => (onClick(e))} className='JoinButtonContainer'> 
      <img className='joinimg' src={img} />
      <div className='JoinButtonTitle'>{title}</div>  
    </div>
  );
}

export default JoinButton;
 