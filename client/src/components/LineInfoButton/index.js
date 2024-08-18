import React from 'react';
import images from '../../assets/images';
import './index.css';

function LineInfoButton(props) {
  const { title, img, size, onClick, noarr } = props;
  const { arrow } = images;
  
  return(
    <div className='lineInfoButtonContainer' onClick={(e) => (onClick(e))}>  
      <img style={{
           width: `${size ? '40px' : '25px'}`,
           height: `${size ? '40px' : '25px'}`, 
        }} className='lineInfoButtonSmile' src={img} /> 
      <div style={{
           fontSize: `${size ? '35px' : '15px'}`, 
        }} className='lineInfoButtonTitle'>{title}</div>
        {
         noarr ? <></> : <div className='lineInfoButtonArrowContainer'>
            <img className='lineInfoButtonArrow' src={arrow} />
          </div>  
        } 
    </div>
  );
}

export default LineInfoButton;