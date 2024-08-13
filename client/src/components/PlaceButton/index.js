import React from 'react';
import images from '../../assets/images';
import { decimal } from '../../hooks/helpservice';
import './index.css';

function PlaceButton(props) {
  const { name, countMine, num, userButton } = props; 
  const { teher,goldmedal,silvermedal,bronzemedal } = images; 
 

  return(
    <div style={{ backgroundColor: userButton ? '#fee48d' : 'rgb(255 231 200)' }} className='infoPlaceWrapper'> 
       <div className={`${num < 3 ? 'infoPlaceMedalContainer' :'infoPlaceNumContainer' }`}>
        {
          num === 1 ? <img className='infoPlaceImgMedal' src={goldmedal} /> :
          num === 2 ? <img className='infoPlaceImgMedal' src={silvermedal} /> :
          num === 3 ? <img className='infoPlaceImgMedal' src={bronzemedal} /> :
          <div className='infoPlaceNum'> {`+ ${ decimal(num)}`}</div>
        } 
      </div> 
      <div className='infoPlaceImgContainer'> 
        <div className='infoPlaceImgNameContainer'>
          <div className='nameSimbole'>{name[0]}</div>
        </div>
      </div> 
      <div className='infoPlaceTitleContainer'> 
        <div className='infoPlaceName'>{name}</div>  
        <div className='infoPlaceContainer'>
          <div className='infoPlaceCountMine'>{countMine}</div>  
          <img className='infoPlaceImgCount' src={teher} />   
        </div>
      </div>  
    </div>
  );
}

export default PlaceButton;
 