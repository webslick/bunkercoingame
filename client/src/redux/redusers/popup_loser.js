import ActionTypes from '../constants';

const initialState = {
  popup_visible: false
};

export default function popup_loser(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.POPUP_LOOSER_VISIBLE:
      return {
        ...state,
        popup_visible: payload,
      };   
    default:
      return state;
  }
}