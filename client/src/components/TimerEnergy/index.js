import React, { useState, useEffect } from 'react';   
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { timer } from '../../redux/selectors'; 
import { setDayEnergy, setHoursEnergy, setMinutesEnergy, setSecoundsEnergy } from '../../redux/actions/timer'
import './index.css';
import images from '../../assets/images';
 
function TimerEnergy(props) {

  const { deadline, onTime } = props;  
  const { around } = images;

  const dispatch = useDispatch(); 
  
  const energy = useSelector(timer.energy);

  const days = energy.days;
  const hours = energy.hours;
  const minutes = energy.minutes;
  const seconds = energy.seconds;
 
  useEffect(() => { 
    const x = setInterval(() => { 
      var t =  moment.duration(moment(deadline).diff(moment()))  
      
      dispatch(setDayEnergy(t.get('days')));
      dispatch(setHoursEnergy(t.get('hours')));
      dispatch(setMinutesEnergy(t.get('minutes')));
      dispatch(setSecoundsEnergy(t.get('seconds')));
 
      if (t < 0) {
        clearInterval(x);
        setDayEnergy(0);
        setHoursEnergy(0);
        setMinutesEnergy(0);
        setSecoundsEnergy(0);
        onTime(); 
      }
    }, 1000);
  
    return () => clearInterval(x)
  }, [])
   
  return( 
    <div className='energyTimerContainer'>  
       <img className='recikleImg' src={around} /> 
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

export default TimerEnergy;



 