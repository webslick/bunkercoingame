import ActionTypes from '../constants';

const initialState = {
  mobile: false,
};

export default function app(state = initialState, { type, payload }) {
 
  switch (type) {
    case ActionTypes.APP_MOBILE:
      return {
        ...state,
        mobile: payload
      }; 
    default:
      return state;
  }
}