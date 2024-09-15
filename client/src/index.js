
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom';
import  {  WebAppProvider }  from  '@vkruglikov/react-telegram-web-app' ;
import App from './App';
import store from './redux/store';
import "./main.scss";
import './index.css'; 
import "./styles.scss"; 
 
const doc = document.getElementById("root")
const root = createRoot(doc);

root.render(
  <>
    <WebAppProvider>
      <BrowserRouter>
        <Provider store={store}> 
          <App /> 
        </Provider>
      </BrowserRouter>
    </WebAppProvider>
  </>
);
   