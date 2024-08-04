import React from 'react';
import images from '../../assets/images';
import './index.css';

function InfoGroupTablo(props) {
  const { name, img, countMine, num, userButton } = props; 
  const { teher,goldmedal,silvermedal,bronzemedal } = images; 
  
  return(
    <div className='infoGroupPlaceWrapper'>  
      <div className='infoGroupPlaceTitleContainer'>  
        <div className='infoGroupPlaceContainer'>
          <img className='infoGroupPlaceImgCount' src={teher} />   
          <div className='infoGroupPlaceCountMine'>{countMine}</div>  
        </div>
        <div className='infoGroupPlaceName'>Daily mine</div> 
      </div>  
      <div className='groupDelimetr'/>
      <div className='infoGroupPlaceTitleContainer'>  
        <div className='infoGroupPlaceContainer'>
          <img className='infoGroupPlaceImgCount' src={teher} />   
          <div className='infoGroupPlaceCountMine'>{countMine}</div>  
        </div>
        <div className='infoGroupPlaceName'>All time mine</div> 
      </div>  
      <div className='groupDelimetr'/>
      <div className='infoGroupPlaceTitleContainer'>  
        <div className='infoGroupPlaceContainer'>
          <img className='infoGroupPlaceImgCount' src={teher} />   
          <div className='infoGroupPlaceCountMine'>{countMine}</div>  
        </div>
        <div className='infoGroupPlaceName'>players</div> 
      </div>  
    </div>
  );
}

export default InfoGroupTablo;
 