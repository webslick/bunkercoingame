import React from 'react';
import images from '../../assets/images';
import './index.css';

function PlaceButton(props) {
  const { name, img, countMine, num, userButton } = props; 
  const { teher,goldmedal,silvermedal,bronzemedal } = images; 
 

  const decimal = (number) => {
    let a, million, c, thousand, e, hundred, g, dozens, units = 0;
 
    a = number / 1000000
    million = a % 10 
    c = number / 1000
    thousand = c % 10 
    e = number / 100
    hundred = e % 10 
    g = number / 10
    dozens = g % 10 
    units = number % 10

    console.log(million,'million')
    console.log(thousand,'thousand')

    if(million >= 1) {
      return `${million} M`
    } else if(thousand >= 1 && million < 1) {
      return `${thousand} K`
    } else {
      return number
    } 
  }

 
  return(
    <div style={{ backgroundColor: userButton ? '#fee48d' : 'rgb(255 231 200)' }} className='infoPlaceWrapper'> 
       <div className={`${num < 3 ? 'infoPlaceMedalContainer' :'infoPlaceNumContainer' }`}>
        {
          num === 0 ? <img className='infoPlaceImgMedal' src={goldmedal} /> :
          num === 1 ? <img className='infoPlaceImgMedal' src={silvermedal} /> :
          num === 2 ? <img className='infoPlaceImgMedal' src={bronzemedal} /> :
          <div className='infoPlaceNum'> {`+ ${decimal(num)}`}</div>
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
 