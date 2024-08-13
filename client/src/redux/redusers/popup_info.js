import ActionTypes from '../constants';

const initialState = {
  popup_visible_info: false, 
};

export default function popup_info(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.POPUP_INFO_VISIBLE:
      return {
        ...state,
        popup_visible_info: payload,
      };  
    default:
      return state;
  }
}