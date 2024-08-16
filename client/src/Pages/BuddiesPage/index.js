import React from 'react';
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import GetButton from '../../components/GetButton';
import { decimal } from '../../hooks/helpservice'
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function BuddiesPage(props) { 

  const { telega,teher,love, cool,rocket,arrow,selphi } = images;

  const { tg, user, appInfo } = props;

  const navigate = useNavigate();
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });


  const isEmptyObject = (obj) => {
    for (var i in obj) { 
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
  }


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
    balance_count = partners_count + partners_twolevel_count;
   console.log()
  }
  return(
    <div className='buddiesScreen'>
      <Title title='Buddy Party!'/> 
      <Subtitle subtitle='Get 50% of all B ur buddies earn, get 25% of all coins the buddies of ur buddies earn'/> 
      <div className='rewardContainer'> 
          <RewardBox
            title={`Reward for $ invited buddies`}
            count={partners_count}
            countbuddies={partners}
            onCLick={(e) => { 
              navigate('/invitedpage')
            }}
          /> 
        <RewardBox title={`Reward for $ invited buddies of buddies`} count={partners_twolevel_count} countbuddies={partners_twolevel} noarrow={true} />
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
            <GetButton title="Get 100 000 000" img={teher} fill={false} onCLick={()=>{}} />
          </div> 
        </div> 
      </div>
      <div className='bonusInviteButtonContainer'>
        <GetButton title="Invite Buddies"  fill={!false} invite={true} onCLick={()=>{tg.openTelegramLink(`${user.partnerLink} Play 2048 to earn Bcoin for free!💸`)}}/>
      </div> 
    </div>
  );
}

export default BuddiesPage;