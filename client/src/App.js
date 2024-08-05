 
import React, { useEffect, useState } from 'react';
import { QRCode } from 'antd'; 
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import Main from './routes/index';
import useTelegram from './hooks/useTelegram';
import useScript from './hooks/useScript';

import { change_page, setMobileMod, set_appinfo } from './redux/actions/app'; 
import {  set_user, getUserInfo, getAppInfo } from './redux/actions/users'; 
import {  app, users,  } from './redux/selectors'; 
 
// import PopapLogin from './components/PopapLogin';
// import PopapReferal from './components/PopapReferal';

import './App.css';
 
function App() {

  const dispatch = useDispatch();  
  const mobile = useSelector(app.mobile);  
  const appInfo = useSelector(app.appInfo);  

  const user = useSelector(users.user);  

  // const popup_visible = useSelector(popup_login.popup_visible);  
  // const popup_referal_visible = useSelector(popup_referal.popup_visible);  
 
  // const loading = useSelector(loader.loading);

  const [loaddingdata,setLoadData] = useState(false);
 

  const { tg, usertg, queryId } = useTelegram();

  useEffect(()=>{
    tg.ready();
    tg.expand();
  },[tg])


  useEffect(() => {    
    const fetchData = async () => {
      console.log(usertg,' TG WARNING USESTATE')
      const user = await getUserInfo(usertg.id);  
      const appInfo = await getAppInfo(dispatch) 
      if(user !== 401) {  
        dispatch(set_user(user));  
      }   
      if(appInfo !== 401) {  
        dispatch(set_appinfo(appInfo));  
      }   
      setLoadData(true) 
    }; 
    fetchData(); 
  },[loaddingdata]);  
 
  useEffect(() => {   

    if(localStorage.getItem('page') === null) {  
      localStorage.setItem('page','main'); 
    }   

    dispatch(setMobileMod(isMobile));
    dispatch(change_page(localStorage.getItem('page'))); 
 
  },[]);  
 
 
  console.log(tg)
  console.log(usertg)
  console.log(user)
  console.log(queryId,'queryId')
  console.log(appInfo,'appInfo')
  
  function stopSpin(e) {
    // let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
  
    // ; //расширяем на все окно 
    
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
            <Main tg={ tg } user={ user } appInfo={ appInfo } />  
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

  