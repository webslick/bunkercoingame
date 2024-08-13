import ActionTypes from '../constants'; 

export function setDayDaily(days) {
  return {
    type: ActionTypes.TIMER_DAYS_DAILY,
    payload: days
  }
}

export function setHoursDaily(hours) { 
  return {
    type: ActionTypes.TIMER_HOURS_DAILY,
    payload: hours
  }
} 

export function setMinutesDaily(minutes) {  
  return {
    type: ActionTypes.TIMER_MINUTES_DAILY,
    payload: minutes
  }
} 

export function setSecoundsDaily(seconds) {  
  return {
    type: ActionTypes.TIMER_SECONDS_DAILY,
    payload: seconds
  }
}  

export function setDayEnergy(days) {
  return {
    type: ActionTypes.TIMER_DAYS_ENERGY,
    payload: days
  }
}

export function setHoursEnergy(hours) { 
  return {
    type: ActionTypes.TIMER_HOURS_ENERGY,
    payload: hours
  }
} 

export function setMinutesEnergy(minutes) {  
  return {
    type: ActionTypes.TIMER_MINUTES_ENERGY,
    payload: minutes
  }
} 

export function setSecoundsEnergy(seconds) {  
 
  return {
    type: ActionTypes.TIMER_SECONDS_ENERGY,
    payload: seconds
  }
}  