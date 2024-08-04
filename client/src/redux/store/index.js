 import { configureStore, applyMiddleware } from '@reduxjs/toolkit' 
import  thunk  from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from '../redusers/index';
 
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
}); 
const store = configureStore({reducer}, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk),
)); 
// const store = createStore(reducers,compose(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;