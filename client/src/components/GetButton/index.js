import React from 'react'; 
import './index.css';

function GetButton(props) {
  const { title, img, invite, onClick, fill } = props; 
 
  return( 
    <div  onClick={(e) => (onClick(e))} style={{backgroundColor: `${fill ? 'rgb(254 213 24)' : 'rgb(225 222 208)'}`}} className='getButtonContainer'>
      <div style={{color: `${fill ? 'rgb(36 31 12)' : 'rgb(173 170 157)'}`}} className='getButtonTitle'>{title}</div>
      {invite ? <></> : <img className='getButtonImg' src={img} /> } 
    </div>  
  );
}

export default GetButton;