import ActionTypes from '../constants';

const initialState = {
  tab: 0,
  hidden: false 
};

export default function footer(state = initialState, { type, payload }) {
 
  switch (type) {
    case ActionTypes.FOOTER_TAB:
      return {
        ...state,
        tab: payload
      };  
    case ActionTypes.FOOTER_HIDDEN:
      return {
        ...state,
        hidden: payload
      };  
    default:
      return state;
  }
}