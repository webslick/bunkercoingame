import React from 'react';
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import PlaceButton from '../../components/PlaceButton';
import SwitcherTime from '../../components/SwitcherTime';
import PrizeTitle from '../../components/PrizeTitle';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function BestPage(props) { 
  const { telega,teher,love, cool,rocket,arrow,selphi,prize } = images;

  const navigate = useNavigate();

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
    <div className='bestScreen'>
      <Title title='B-B-Best game!'/>  
      <div className='bestSwitchContainer'>  
        <SwitcherTime switcher={false} />
      </div> 
      <div className='bestContainer'>
        <PrizeTitle subimg={teher} img={prize} title="Daily prize pool 244M" />
      </div>
      {
        userPlace > 9 ? 
        <div className='userPlaceContainer'>
        <PlaceButton userButton num={userPlace} name={"Alex"} countMine={4133} img={cool} />
      </div>
        : <></>
      } 
      <div className='rankPlaceContainer'>
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

export default BestPage;