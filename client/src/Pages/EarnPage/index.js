import React, { useEffect, useState } from "react"; 
import Title from '../../components/Title'  
import TaskCartsContainer from '../../components/TaskCartsContainer/index'
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom';
import {BackButton, MainButton, useCloudStorage, useHapticFeedback} from "@vkruglikov/react-telegram-web-app";
import './index.css'; 

function EarnPage(props) { 
  const { rocket,teher, cool, helpsmile, agry } = images;
  const { tg } = props;

  const navigate = useNavigate();
  
  let carts = [
    [
      {
        title: "Jetton",
        img: cool,
        count: '200 K',
        coin: teher,
        subcoin: rocket,
        subcount: "",
        margin: "",
        noarrow: ""
      },
    ],
    [
      {
        title: "Invite 10 Buddys",
        img: helpsmile,
        count: '1 M',
        coin: teher,
        subcoin: rocket,
        subcount: "30",
        margin: "",
        noarrow: ""
      },
      {
        title: "Ladesov Crypto",
        img: cool,
        count: '50 K',
        coin: teher,
        subcoin: rocket,
        subcount: "",
        margin: "",
        noarrow: ""
      },
      {
        title: "Join Bcoin2048 TG channel",
        img: agry,
        // count: '200 K',
        coin: teher,
        subcoin: '',
        subcount: "",
        margin: "",
        noarrow: false
      },
    ]]
  
    let titles= ['Main task','Task list']

  return(
    <div className='earnScreen'>
       <BackButton onClick={async() => { navigate('/');}}/>
      <Title title='Earn'/>   
      {
        carts.map((item,i) => (<TaskCartsContainer key={i} title={titles[i]} carts={item} /> ))
      } 
    </div>
  );
}

export default EarnPage;