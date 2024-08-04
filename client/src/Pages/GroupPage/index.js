import React from 'react';
import Title from '../../components/Title'
import InfoGroupTablo from '../../components/InfoGroupTablo'
import LineInfoButton from '../../components/LineInfoButton'
import images from '../../assets/images'
import PlaceButton from '../../components/PlaceButton';
import SwitcherTime from '../../components/SwitcherTime';
import PrizeTitle from '../../components/PrizeTitle';
import { Link, useNavigate } from 'react-router-dom';
import {Input} from 'antd';
import './index.css';

function GroupPage(props) { 

  const { bronze,teher,love, cool,rocket,arrow,selphi,prize } = images;

  const { tg } = props;

  const navigate = useNavigate();
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });


  const placeUser = [
    {
      username: 'Alex',
      count: '123',
      imgprofile: love,
    },
    {
      username: 'Alex',
      count: '4563',
      imgprofile: love,
    },
    {
      username: 'Alex',
      count: '1433',
      imgprofile: love,
    },
    {
      username: 'Alex',
      count: '964',
      imgprofile: love,
    },
    {
      username: 'Alex',
      count: '576453',
      imgprofile: love,
    },
    {
      username: 'Alex',
      count: '35',
      imgprofile: love,
    },
    {
      username: 'Alex',
      count: '65353',
      imgprofile: love,
    },
  ] 

  const userPlace = 100000;

  return(
    <div className='groupScreen'>  
      <div className='groupWrapper'>
      <div className='groupTileContainer'>
        <div className='groupImgNine'>
          <img style={{ width: '40px', height: '40px'}} src={selphi} />
        </div> 
      </div>  
      <div className='grouptitle'>{`SKUFF CRYPTO`}</div>   
        <LineInfoButton title={'Bronze'} img={bronze} />
      <div className='groupsubtitle'>{`BBC get 25% of Bitcoin mined by Buddies of the Crew and distribute 15% of Bitcoin amoung 10% of hte Best BBC members`}</div>  
      <InfoGroupTablo name="Daily mine" img={bronze} countMine={'234 K'} num={234} />
      <div className='groupButtonContainer'> 
        <div className='groupInviteContainer'>
          <div className='groupInviteTitle'>Join</div>  
        </div>
      </div> 
      </div>   
      <div className='groupSwitchContainer'>  
        <SwitcherTime switcher={false} />
      </div> 
      <div className='groupContainer'>
        <PrizeTitle subimg={teher} img={prize} title="Daily prize pool 244M" />
      </div> 
      <div className='groupPlaceContainer'>
        {
          placeUser.map((item,i) => { 
            if(i == userPlace) {
              return <PlaceButton userButton key={i} num={userPlace} name={"Александр"} countMine={4133} img={cool} />
            } else return (<PlaceButton key={i} num={i} name={item.username} countMine={item.count} img={item.imgprofile} />)
            })
        } 
      </div>
    </div>
  );
}

export default GroupPage;