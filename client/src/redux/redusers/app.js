import ActionTypes from '../constants';

const initialState = {
  mobile: false,
  appInfo: {}, 
  miningInfo: {},
  progress: {},
  best_switch: true
};

export default function app(state = initialState, { type, payload }) {
 
  switch (type) {
    case ActionTypes.APP_MOBILE:
      return {
        ...state,
        mobile: payload
      }; 
    case ActionTypes.APP_INFO:
      return {
        ...state,
        appInfo: payload
      }; 
    case ActionTypes.APP_MINING_INFO:
      return {
        ...state,
        miningInfo: payload
      }; 
    case ActionTypes.APP_PROGRESS:
      return {
        ...state,
        progress: payload
      }; 
    case ActionTypes.APP_SWITCH:
      return {
        ...state,
        best_switch: payload
      }; 
    default:
      return state;
  }
}