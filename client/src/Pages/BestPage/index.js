import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../../components/Title'
import Subtitle from '../../components/Subtitle'
import RewardBox from '../../components/RewardBox'
import images from '../../assets/images'
import PlaceButton from '../../components/PlaceButton';
import SwitcherTime from '../../components/SwitcherTime';
import PrizeTitle from '../../components/PrizeTitle';
import { set_all_users, getAllUsers } from '../../redux/actions/users';
import { users,app } from '../../redux/selectors';

import './index.css';

function BestPage(props) { 
  const { tg } = props;
  const { telega,teher,love, cool,rocket,arrow,selphi,prize } = images;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const all_users = useSelector(users.all_users)
  const user = useSelector(users.user)
  const best_switch = useSelector(app.best_switch);

  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });

  // tg.onEvent('backButtonClicked', function() {
  //   /* код */
  //   console.log('@!#@#@#')
  // });
 

  useEffect(() => {    
    const fetchData = async () => { 
      const allUsers = await getAllUsers();
      if(allUsers !== 401) {  
        dispatch(set_all_users(allUsers));  
      }    
    }; 
    fetchData(); 
  },[]); 
  
  const allTimeUsers = all_users.slice(0);
  const dailyUsers = all_users.slice(0);
 
  let resultArrAllTime = allTimeUsers.sort((user1, user2) => Number(JSON.parse(user1["bestGame"])["all_time"]["coins"]) > Number(JSON.parse(user2["bestGame"])["all_time"]["coins"]) ? -1 : 1);
  resultArrAllTime = resultArrAllTime.map((item, i) => {  
    return {...item, bestGame: { ...JSON.parse(item?.bestGame), all_place : i }} 
  })
 
  let resultArrDaily = dailyUsers.sort((user1, user2) => Number(JSON.parse(user1["bestGame"])["daily"]["coins"]) > Number(JSON.parse(user2["bestGame"])["daily"]["coins"]) ? -1 : 1);
  resultArrDaily = resultArrDaily.map((item, i) => {  
    return {...item, bestGame: { ...JSON.parse(item?.bestGame), daily_place : i }} 
  })
  
  const result = best_switch ? resultArrDaily : resultArrAllTime;
  var itemres = 0;
 
  result.map((item,i) => {
    if (item.user_id == user.user_id) {
      itemres = i
    }
    return false;
  }) 
  
  return(  
    <div className='bestScreen'>
      <Title title='B-B-Best game!'/>  
      <div className='bestSwitchContainer'>  
        <SwitcherTime best_switch={best_switch} timer />
      </div> 
      {
        false ? 
        <div className='bestContainer'>
          <PrizeTitle subimg={teher} img={prize} title="Daily prize pool 244M" />
        </div>
        : <></>
      } 
      {
        result[itemres]?.bestGame.daily_place >= 11 ? 
        <div className='userPlaceContainer'>
         <PlaceButton userButton num={best_switch ? result[itemres]?.bestGame.daily_place + 1 : result[itemres]?.bestGame.all_place + 1} name={result[itemres]?.user_name} countMine={best_switch ? result[itemres]?.bestGame.daily.coins : result[itemres]?.bestGame.all_time.coins} />
        </div>
        : <></>
      } 
      <div className='rankPlaceContainer'>
        {  
          result.map((item,i) => { 
            
            if(best_switch) {  
              if(i == result[itemres]?.bestGame.daily_place) { 
                return <PlaceButton userButton key={i} num={item?.bestGame.daily_place + 1} name={item.user_name} countMine={item.bestGame.daily.coins} />
              } else return <PlaceButton key={i} num={item?.bestGame.daily_place + 1 } name={item.user_name} countMine={item.bestGame.daily.coins} />
            } else {  
              if(i == result[itemres]?.bestGame.all_place ) {
                return <PlaceButton userButton key={i} num={item?.bestGame.all_place + 1} name={item.user_name} countMine={item.bestGame.all_time.coins} />
              } else return (<PlaceButton key={i} num={item?.bestGame.all_place + 1} name={item.user_name} countMine={item.bestGame.all_time.coins} />)
            }

          })   
        }
      </div>
    </div>
  );
}

export default BestPage;