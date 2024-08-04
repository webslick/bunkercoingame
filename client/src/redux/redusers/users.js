import ActionTypes from '../constants';

const initialState = {
  user: {},  
};

export default function users(state = initialState, {type,payload}) {
  switch (type) {
    case ActionTypes.USERS_PUT_USER:
      return {
        ...state,
        user: payload,
      }; 
    default:
      return state;
  }
}