import React, { useEffect, useState } from "react"; 
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import GetButton from '../../components/GetButton';
import { decimal, isEmptyObject } from '../../hooks/helpservice'
import { Link, useNavigate } from 'react-router-dom';
import {BackButton, MainButton, useCloudStorage, useHapticFeedback} from "@vkruglikov/react-telegram-web-app";
import './index.css';

function BuddiesPage(props) { 

  const { teher } = images;

  const { tg, user } = props;

  const navigate = useNavigate();
  
  function reducer(accumulator, currentValue, index) {
    const returns = { name: accumulator.name, total_coins: accumulator.total_coins + currentValue.total_coins }; 
    return returns;
  }

  let balance_count = 'empty';
  let partners = 'empty';
  let partners_count = 'empty';
  let partners_twolevel = 'empty';
  let partners_twolevel_count = 'empty';
  let bestGameScore = 'empty';
  let bestGameCoins = 'empty'; 

  if(!isEmptyObject(user)) { 
    partners = JSON.parse(user.partners).length; 
    partners_count = JSON.parse(user.partners).length == 0 ? '0.00' : JSON.parse(user.partners).reduce(reducer).total_coins / 2;
    partners_twolevel = JSON.parse(user.partners_twolevel).length;
    partners_twolevel_count = JSON.parse(user.partners_twolevel).length == 0 ? '0.00' : JSON.parse(user.partners_twolevel).reduce(reducer).total_coins / 4;
    balance_count = Number(partners_count) + Number(partners_twolevel_count);
  
  }
  return(
    <div className='buddiesScreen'>
       <BackButton onClick={async() => { navigate('/');}}/>
      <Title title='Buddy Party!'/> 
      <Subtitle subtitle='Get 50% of all B ur buddies earn, get 25% of all coins the buddies of ur buddies earn'/> 
      <div className='rewardContainer'> 
          <RewardBox 
            title={`Reward for $ invited buddies`}
            count={decimal(partners_count)}
            countbuddies={partners}
            onClick={(e) => { 
              navigate('/invitedpage')
            }}
          /> 
        <RewardBox onClick={(e) => {}} title={`Reward for $ invited buddies of buddies`} count={decimal(partners_twolevel_count)} countbuddies={partners_twolevel} noarrow={true} />
      </div>
      <div className='bonusWrapper'>
        <div className='bonusContainer'>
          <div className='bonusContainerTop'>
            <div className='bonusTitle'>Bonus 100 000 000</div>
            <div className='bonusSubTitle'>Earn additional Bunkercoin</div>
            <div className='bonusInfo'>
              <img className='bonusInfoImg' src={teher} />  
              <div className='bonusInfo'>{`${decimal(+user?.balance_count + balance_count)} / 1000 M`}</div>
            </div>
          </div>
          <div className='bonusContainerBottom'>
            <div className='bonusEarnedTitle'>{`You earned `}&nbsp;<span style={{color: 'black', fontWeight:'700'}}>{decimal(balance_count)}</span> &nbsp;<div>Reward for all friends:</div>&nbsp;<span style={{color: 'black', fontWeight:'700'}}>{partners + partners_twolevel}</span></div>
            <GetButton title="Get 100 000 000" img={teher} fill={false} onClick={()=>{}} />
          </div> 
        </div> 
      </div>
      <div className='bonusInviteButtonContainer'>
        <GetButton title="Invite Buddies"  fill={!false} invite={true} onClick={()=>{tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}&text=Play 2048 to earn BitBunke for free!💸`);}}/>
      </div> 
    </div>
  );
}

export default BuddiesPage;