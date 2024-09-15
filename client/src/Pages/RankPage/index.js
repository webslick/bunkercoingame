import React, { useEffect, useState } from "react"; 
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import PlaceButton from '../../components/PlaceButton';
import SwitcherTime from '../../components/SwitcherTime';
import PrizeTitle from '../../components/PrizeTitle';
import { Link, useNavigate } from 'react-router-dom';
import {BackButton, MainButton, useCloudStorage, useHapticFeedback} from "@vkruglikov/react-telegram-web-app";
import './index.css';

function RankPage(props) { 
  const { telega,teher,love, cool,rocket,arrow,selphi,prize } = images;

  const { tg } = props;

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

  const userPlace = 10000000;

  return(
    <div className='rankPrizeScreen'>
      <Title title='U & Buddies vs Da Wrld'/> 
      <Subtitle subtitle='Ur B +50% of buddies B + 25% of their buddies B'/> 
      <div className='rankPrizeSwitchContainer'>  
        <SwitcherTime switcher={false} />
      </div> 
      <div className='rankPrizeContainer'>
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

export default RankPage;