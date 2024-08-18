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
import { users } from '../../redux/selectors';

import './index.css';

function BestPage(props) { 
  const { tg } = props;
  const { telega,teher,love, cool,rocket,arrow,selphi,prize } = images;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const all_users = useSelector(users.all_users)
  const user = useSelector(users.user)

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
  let resultArrDaily = dailyUsers.sort((user1, user2) => Number(JSON.parse(user1["bestGame"])["daily"]["coins"]) > Number(JSON.parse(user2["bestGame"])["daily"]["coins"]) ? -1 : 1);
  
  return(  
    <div className='bestScreen'>
      <Title title='B-B-Best game!'/>  
      <div className='bestSwitchContainer'>  
        <SwitcherTime timer />
      </div> 
      {
        false ? 
        <div className='bestContainer'>
          <PrizeTitle subimg={teher} img={prize} title="Daily prize pool 244M" />
        </div>
        : <></>
      } 
      {
        user?.bestGame.daily_place > 3 ? 
        <div className='userPlaceContainer'>
        <PlaceButton userButton num={ user.bestGame.daily_place} name={user.user_name} countMine={user.balance_count} />
      </div>
        : <></>
      } 
      <div className='rankPlaceContainer'>
        {
          
        }
        {/* {
          a.map((item,i) => { 
            if(i + 1 == User?.place) {
              return <PlaceButton userButton key={i} num={User?.place} name={User.user_name} countMine={User.balance_count} />
            } else return (<PlaceButton key={i} num={item?.place} name={item.user_name} countMine={item.balance_count} />)
            })
        }  */}
      </div>
    </div>
  );
}

export default BestPage;