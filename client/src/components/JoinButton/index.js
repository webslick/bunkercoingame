import React from 'react';
import './index.css'; 

function JoinButton(props) {
  const { title, img, url } = props;  
  return(
    <div onClick={() => { window.location.assign(url); }} className='JoinButtonContainer'> 
      <img className='joinimg' src={img} />
      <div className='JoinButtonTitle'>{title}</div>  
    </div>
  );
}

export default JoinButton;
 