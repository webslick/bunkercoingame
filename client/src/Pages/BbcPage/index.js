import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import images from '../../assets/images' 
import SwitcherRank from '../../components/SwitcherRank';
import LineButton from '../../components/LineButton'; 
import {BackButton, MainButton, useCloudStorage, useHapticFeedback} from "@vkruglikov/react-telegram-web-app";
import {Input} from 'antd';
import './index.css';

function BbcPage(props) { 
  const { tg } = props;
  const { love, selphi } = images;

  const navigate = useNavigate() 
 
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
    <div className='bbcScreen'>  
     <BackButton onClick={async() => { navigate('/');}}/>
      <div className='bbcWrapper'>
      <div className='bbcTileContainer'>
        <div className='bbcImgNine'>
          <img style={{ width: '40px', height: '40px'}} src={selphi} />
        </div> 
      </div>  
      <div className='bbctitle'>{`Join to Big Buddies Crew`}</div>   
      <div className='bbcsubtitle'>{`With BBC u can get more BitBunke`}</div>  
      <div className='bbcButtonContainer'>
        <div className='bbcInputContainer'> 
          <Input style={{borderColor: '#ffd14f'}} placeholder="Link to the community" />
        </div>
        <div className='bbcInviteContainer'>
          <div className='bbcInviteTitle'>Join</div>  
        </div>
      </div> 
      </div>  
      <SwitcherRank /> 
      <div className='bbcContainer'>
        {
          placeUser.map((item,i) => { 
            return <LineButton 
            title={''}
            // smile={''}
            // btn={}
            leftTitle={item.username}
            // rightTitle={}
            leftSubTitle={item.count}
            // rightSubTitle={}
            // coin={}
            // onClick={}
            key={i} />
          })
        } 
      </div>
    </div>
  );
}

export default BbcPage;