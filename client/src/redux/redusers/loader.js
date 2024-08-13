import ActionTypes from '../constants';

const initialState = {
  loading: false
};

export default function loader(state = initialState, { type, payload }) {
 
  switch (type) {
    case ActionTypes.APP_LOADING:
      return {
        ...state,
        loading: payload
      };   
    default:
      return state;
  }
}