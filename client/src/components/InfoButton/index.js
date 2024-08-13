import React from 'react'; 
import './index.css'; 

function InfoButton(props) {
  const { title, width, teher, onClick, fill } = props;  
 
  return( 
    <div  onClick={(e) => (onClick(e))} style={{backgroundColor: `${fill ? 'rgb(254 213 24)' : 'white'}`, width: width ? '60%' : 'auto'}} className='infoButtonContainer'>
      <div className='infoButtonTitle'>{title}</div> 

    </div>  
  );
}

export default InfoButton;