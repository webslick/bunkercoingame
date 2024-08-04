import React from 'react';
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import GetButton from '../../components/GetButton';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function BuddiesPage(props) { 
  const { telega,teher,love, cool,rocket,arrow,selphi } = images;

  const navigate = useNavigate();

  return(
    <div className='buddiesScreen'>
      <Title title='Buddy Party!'/> 
      <Subtitle subtitle='Get 50% of all B ur buddies earn, get 25% of all coins the buddies of ur buddies earn'/> 
      <div className='rewardContainer'> 
          <RewardBox
            title={`Reward for $ invited buddies`}
            count={4000}
            countbuddies={4}
            onCLick={(e) => { 
              navigate('/invitedpage')
            }}
          /> 
        <RewardBox title={`Reward for $ invited buddies of buddies`} count={9000} countbuddies={4} noarrow={true} />
      </div>
      <div className='bonusWrapper'>
        <div className='bonusContainer'>
          <div className='bonusContainerTop'>
            <div className='bonusTitle'>Bonus 100 000</div>
            <div className='bonusSubTitle'>Earn additional Bunkercoin</div>
            <div className='bonusInfo'>
              <img className='bonusInfoImg' src={teher} />  
              <div className='bonusInfo'>{`${37} K / 1000 M`}</div>
            </div>
          </div>
          <div className='bonusContainerBottom'>
            <div className='bonusEarnedTitle'>{`You earned `}&nbsp;<span style={{color: 'black', fontWeight:'700'}}>37k </span> &nbsp;<div>Reward for all friends:</div>&nbsp;<span style={{color: 'black', fontWeight:'700'}}>0</span></div>
            <GetButton title="Get 100 000 000" img={teher} fill={false} />
          </div> 
        </div> 
      </div>
      <div className='bonusInviteButtonContainer'>
        <GetButton title="Invite Buddies"  fill={!false} invite={true} />
      </div> 
    </div>
  );
}

export default BuddiesPage;