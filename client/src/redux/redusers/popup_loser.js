import ActionTypes from '../constants';

const initialState = {
  popup_visible_looser: false
};

export default function popup_looser(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.POPUP_LOOSER_VISIBLE:
      return {
        ...state,
        popup_visible_looser: payload,
      };   
    default:
      return state;
  }
}