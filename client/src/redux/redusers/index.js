import { combineReducers } from 'redux';
import footer from './footer'
import app from './app'
import loader from './loader' 
import popup_looser from './popup_loser'
import popup_info from './popup_info'
import users from './users' 
import timer from './timer'   

const rootReducer = combineReducers({
  app, 
  footer,
  popup_looser,
  popup_info, 
  users, 
  loader,
  timer,
});

export default rootReducer;