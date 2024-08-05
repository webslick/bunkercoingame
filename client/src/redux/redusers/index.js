import { combineReducers } from 'redux';
import footer from './footer'
import app from './app'
import pageinfo from './pageinfo'
import pages from './pages'
import popup_loser from './popup_loser'
import popup_info from './popup_info'
import users from './users' 

const rootReducer = combineReducers({
  app,
  pages, 
  footer,
  popup_loser,
  popup_info, 
  users, 
});

export default rootReducer;