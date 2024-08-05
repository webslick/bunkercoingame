import ActionTypes from '../constants';

const initialState = {
  mobile: false,
  appInfo: {}, 
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
    default:
      return state;
  }
}