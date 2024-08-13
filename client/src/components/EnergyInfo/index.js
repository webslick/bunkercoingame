import React from 'react';
import images from '../../assets/images';
import moment from 'moment'
import TimerEnergy from '../TimerEnergy';
import { convertTimeBd } from '../../hooks/helpservice';
import { set_info_user,set_user} from '../../redux/actions/users';

import './index.css';
import { useDispatch } from 'react-redux';

function EnergyInfo(props) {
  const { user, activeTimer } = props;
  const { energy_img, around } = images;

  function setmoment(count,time) {
  
    let t = '';
    switch (time) {
      case 'd':
          t = 'day';
        break;
      case 'h':
        t = 'hours';
        break;
      case 'm':
        t = 'minutes';
        break;
      case 's':
        t = 'seconds';
        break; 
      default:
        t = 'day';
        break;
    }
 
    return moment(user.date_loss_game).add(count, t) 
  }
 
  const dispatch = useDispatch();
 
  return(
    <div className='energyContainer'> 
      <img className='enrgyimg' src={energy_img} />
      <div className='displayEnergy'>{user.energy}</div>
      <div className='displayEnergy'>of</div>
      <div className='displayEnergy'>4</div>
      {
        activeTimer === true ?
        <div className='timerContainer'> 
          <TimerEnergy deadline={ setmoment(6,'h') } onTime={async() => {
            console.log('timer stoping!')
            let newuser = await set_info_user({
              ...user,
              userId: user.user_id,
              date_loss_game: null,
              energy: 4, 
            },dispatch);
            dispatch(set_user(newuser))
          }} />  
        </div> : <></>
      } 
    </div>
  );
}

export default EnergyInfo;