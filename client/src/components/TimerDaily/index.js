import React, { useState, useEffect } from 'react';   
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { timer } from '../../redux/selectors'; 
import { setDayDaily, setHoursDaily, setMinutesDaily, setSecoundsDaily } from '../../redux/actions/timer'
import './index.css';
 
function TimerDaily(props) {

  const { deadline, onTime } = props;  

  const dispatch = useDispatch();
  const daily = useSelector(timer.daily);
  const days = daily.days;
  const hours = daily.hours;
  const minutes = daily.minutes;
  const seconds =daily.seconds;

  useEffect(() => { 
    const x = setInterval(() => { 
      var t =  moment.duration(moment(deadline).diff(moment())) 

      // var d = Math.floor(t / (1000 * 60 * 60 * 24));
      // var h = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      // var m = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
      // var s = Math.floor((t % (1000 * 60)) / 1000); 
    
      dispatch(setDayDaily(t.get('days')));
      dispatch(setHoursDaily(t.get('hours')));
      dispatch(setMinutesDaily(t.get('minutes')));
      dispatch(setSecoundsDaily(t.get('seconds')));
 
      if (t < 0) {
        clearInterval(x);
        setDayDaily(0);
        setHoursDaily(0);
        setMinutesDaily(0);
        setSecoundsDaily(0);
        onTime(); 
      }
    }, 1000);
  
    return () => clearInterval(x)
  }, [])
   
  return( 
    <div className='dailyTimerContainer'>  
      {
        days ? 
        <>
          <span className="day" id="day">{days}</span> 
          <div className="smalltext">d</div>
        </>
        : <></>
      } 
      <span className="hours" id="hour">{hours}</span> 
      <div className="smalltext">:</div>  
      <span className="minutes" id="minute">{minutes}</span>
      <div className="smalltext">:</div>  
      <span className="seconds" id="second">{seconds}</span> 
    </div>  
  );
}

export default TimerDaily;



 