import React from 'react';
import EnergyInfo from '../../components/EnergyInfo'
import JoinButton from '../../components/JoinButton'
import BoosterButton from '../../components/BoosterButton'
import LineInfoButton from '../../components/LineInfoButton' 
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom';
import './index.css';
import GetButton from '../../components/GetButton';

function BoosterPage(props) { 
  const { back,cross,arrowf, cool, } = images;
  const { tg } = props;

  const navigate = useNavigate();
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });
  return(
    <div className='boosterScreen'>
      <Title title='Boosters'/> 
      <Subtitle subtitle='Booster helps you to earn more Bunkercoins.Watch short video to get 1 random booster 4 free.'/> 
      <div className='boosterButtonContainer'>
        <BoosterButton title="Move back" img={back} countBoost={1}   />
        <BoosterButton title="Delete tile" img={cross} countBoost={1}   />
        <BoosterButton title="Move without tile" img={arrowf} countBoost={1}   />
      </div>  
      <div className='boosterGetButtonContainer'>
        <GetButton
          title="Get booster"
          fill={true}
          img={cool}
          onCLick={(e) => {
            
          }}
        />
      </div>  
    </div>
  );
}

export default BoosterPage;