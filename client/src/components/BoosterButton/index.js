import React from 'react';
import images from '../../assets/images';
import './index.css';

function BoosterButton(props) {
  const { title, img, countBoost } = props; 
 
  return(
    <div className='boosterButtonWrapper'> 
      <div className='boosterButtonImgContainer'>
        <img className='boosterButtonImg' src={img} /> 
      </div> 
      <div className='boosterButtonTitleContainer'> 
        <div className='boosterButtonTitle'>{title}</div>  
        <div className='boosterButtonSubTitle'>{`${countBoost} available`}</div>   
      </div>  
    </div>
  );
}

export default BoosterButton;
 