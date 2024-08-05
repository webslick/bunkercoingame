import ActionTypes from '../constants';

const initialState = {
  page: 'minepage',  
};

export default function pages(state = initialState, { type, payload }) {
  switch (type) {
    case ActionTypes.APP_PAGES_SCREEN:
      return {
        ...state,
        page: payload,
      }; 
    default:
      return state;
  }
}