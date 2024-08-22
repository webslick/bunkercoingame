import React, { useState } from 'react';  
import { useDispatch, useSelector } from 'react-redux';
import { set_switch } from '../../redux/actions/app';
import { app } from '../../redux/selectors';
import moment from 'moment'
import TimerDaily from '../TimerDaily'
import './index.css';

function SwitcherTime(props) {
  const { timer, best_switch } = props; 
  const dispatch = useDispatch();



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
    return moment().add(count, t)
  }
 
  return( 
    <div onClick={() => {  dispatch(set_switch(!best_switch)) }}  className='swichTimeWrapper'> 
      <div style={{backgroundColor: `${best_switch ? 'rgb(255 255 255)' : 'rgb(238 225 202)'}`}} className='switchButtonContainer'>
        <div className='switchButtonTitle'>Daily</div> 
        {
          timer ? <TimerDaily deadline={ moment({  
            year: moment().year(),
            month: moment().month(),
            date: moment().date(),
            hour:0,
            minute: 0,
            second: 0,
            millisecond: 0, 
          }).add(24,'hours') } onTime={() => {
            console.log('timer stoping!')
          }} /> : <></>
        }  
      </div> 
      <div style={{ backgroundColor: `${best_switch ? 'rgb(238 225 202)' : 'rgb(255 255 255)'} `}} className='switchButtonContainer'>
        <div className='switchButtonTitle'>All time</div> 
      </div>   
    </div>  
  );
}

export default SwitcherTime;