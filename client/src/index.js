
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './redux/store';
import "./main.scss";
import "./styles.scss"; 
import './index.css'; 
 
const doc = document.getElementById("root")
const root = createRoot(doc);

root.render(
  <>
   <BrowserRouter>
      <Provider store={store}> 
        <App /> 
      </Provider>
    </BrowserRouter>
  </>
);
   