 
import React, { useEffect, useState } from 'react';
import { QRCode } from 'antd'; 
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Main from './routes/index';
import useTelegram from './hooks/useTelegram';
import useScript from './hooks/useScript';

import { change_page, setMobileMod, visible_footer } from './redux/actions/app'; 
import {  set_user, getUserInfo } from './redux/actions/users'; 
import { pages, app, users, footer } from './redux/selectors'; 
 
// import PopapLogin from './components/PopapLogin';
// import PopapReferal from './components/PopapReferal';

import './App.css';
 
function App() {

  const dispatch = useDispatch();  
  const mobile = useSelector(app.mobile);  

  const user = useSelector(users.user); 

  // const popup_visible = useSelector(popup_login.popup_visible);  
  // const popup_referal_visible = useSelector(popup_referal.popup_visible);  
 
  // const loading = useSelector(loader.loading);

  const [loaddingdata,setLoadData] = useState(false);
 
  useEffect(() => {    
    const fetchData = async () => {
      const user = await getUserInfo(dispatch) 
      if(user !== 401) {  
        dispatch(set_user(user));  
      }   
      setLoadData(true) 
    }; 
    fetchData(); 
  },[loaddingdata]);  

  // useScript("https://telegram.org/js/telegram-web-app.js");

  useEffect(() => {   

    if(localStorage.getItem('page') === null) {  
      localStorage.setItem('page','main'); 
    }   

    dispatch(setMobileMod(isMobile));
    dispatch(change_page(localStorage.getItem('page'))); 
    dispatch(visible_footer(false)); 
  },[]);  
 
  const { tg,usertg } = useTelegram();

  useEffect(()=>{
    tg.ready() 
  },[tg])
 
  console.log(tg)
  console.log(usertg)
  console.log(user)
  
  function stopSpin(e) {
    // let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
  
    // tg.expand(); //расширяем на все окно 
    
    // tg.MainButton.text = "GUGA";
  
    // useCallback(()=>{
    //   tg.sendData(JSON.stringify({userinfo: tg.initDataUnsafe.user, prize: prizeNumber})); 
    // },[])
    console.log("stoppppppppp")
 
  }

 
//  console.log(pages,'pagemain')
  return ( 
    <div className="App">  
        {
          mobile ?    
          <>  
            <Main tg={tg} />  
          </> 
        : 
          <div className='desktop_error'>
            <div>This is a mobile app!</div>
            <div style={{margin: '50px 0px'}}>Scan the QR code and start earning!</div>
            <QRCode
              value={`https://t.me/BitBunker_bot`}
              bgColor="white"
              style={{
                marginBottom: 16,
              }}
            />
          </div> 
        } 
    </div>
  );
}

export default App;

  