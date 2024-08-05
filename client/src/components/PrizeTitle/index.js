import React from 'react'; 
import './index.css';

function PrizeTitle(props) {
  const { title, img, subimg} = props; 
 
  return( 
    <div className='prizeButtonContainer'>
      <img className='prizeButtonImg' src={img} /> 
      <div className='prizeButtonTitle'>{title}</div>
      <img className='prizeButtonImg' src={subimg} /> 
    </div>  
  );
}

export default PrizeTitle;