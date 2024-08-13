import ActionTypes from '../constants';

const initialState = {
  user: {energy: 4, balance_count: 0, score:0}, 
  all_users:[] 
};

export default function users(state = initialState, {type,payload}) {
  switch (type) {
    case ActionTypes.USERS_PUT_USER:
      return {
        ...state,
        user: payload,
      }; 
    case ActionTypes.USERS_PUT_ALL_USER:
      return {
        ...state,
        all_users: payload,
      }; 
    default:
      return state;
  }
}