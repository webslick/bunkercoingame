import React from 'react';
import images from '../../assets/images';
import './index.css';

function EnergyInfo(props) {
  const { energy, activeTimer, time } = props;
  const { energy_img, around } = images;

  return(
    <div className='energyContainer'> 
      <img className='enrgyimg' src={energy_img} />
      <div className='displayEnergy'>{energy}</div>
      <div className='displayEnergy'>of</div>
      <div className='displayEnergy'>4</div>
      {
        activeTimer ?
          <div className='timerContainer'>
            <img className='recikleImg' src={around} /> 
            <div className='time'>{time}</div>
          </div>
        :
         <></>
      }
   
    </div>
  );
}

export default EnergyInfo;