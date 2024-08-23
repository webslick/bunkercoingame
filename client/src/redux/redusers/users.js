import ActionTypes from '../constants';

const initialState = {
  user: {
    energy: 4,
    balance_count: 0,
    score:0,
    bestGame: "{\"daily_place\":0,\"all_place\":0,\"daily\":{\"score\":0,\"coins\":0},\"all_time\":{\"score\":0,\"coins\":0}}",
    date_loss_game: null, 
    hints: "{\"stepback\":0}",
    history: "[]",
    nastavnik: "[]",
    partnerLink: "https://t.me/BitBunker_bot/bitbunkercoin?startapp=ref_6d7f_6107507930_2b58",
    partners: "[]",
    partners_twolevel: "[]",
    privateKey: "",
    subKey: "2b58" 
  }, 
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