import ActionTypes from '../constants';

const initialState = { 
  daily: { 
    days: 0,
    minutes: 0, 
    hours: 0,
    seconds: 0
  },
  energy: { 
    days: 0,
    minutes: 0, 
    hours: 0,
    seconds: 0
  }, 
};

export default function timer(state = initialState, { type, payload }) {
 
  switch (type) {
    case ActionTypes.TIMER_DAYS_DAILY:
      return {
        ...state,
        daily: {
          ...state.daily,
          days: payload
        }   
      }; 
    case ActionTypes.TIMER_HOURS_DAILY:
      return {
        ...state,
        daily: {
          ...state.daily,
          hours: payload
        }   
    };  
    case ActionTypes.TIMER_MINUTES_DAILY:
      return  {
        ...state,
        daily: {
          ...state.daily,
          minutes: payload
        }   
      }; 

    case ActionTypes.TIMER_SECONDS_DAILY:
      return  {
        ...state,
        daily: {
          ...state.daily,
          seconds: payload
        }   
      };   
      case ActionTypes.TIMER_DAYS_ENERGY:
      return  {
        ...state,
        energy: {
          ...state.energy,
          days: payload
        }   
      }; 
    case ActionTypes.TIMER_HOURS_ENERGY:
      return {
        ...state,
        energy: {
          ...state.energy,
          hours: payload
        }   
      };  
    case ActionTypes.TIMER_MINUTES_ENERGY:
      return  {
        ...state,
        energy: {
          ...state.energy,
          minutes: payload
        }   
      };   
    case ActionTypes.TIMER_SECONDS_ENERGY:
      return  {
        ...state,
        energy: {
          ...state.energy,
          seconds: payload
        }   
      };   
    default:
      return state;
  }
}