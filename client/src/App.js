 import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';
import { QRCode } from 'antd'; 
import { setMobileMod, set_appinfo, set_mininginfo, setPartners, getAppInfo } from './redux/actions/app'; 
import { setLoadding } from './redux/actions/loader';  
import { set_user, getUserInfo, set_info_user, createUser } from './redux/actions/users'; 
import { app, users, popup_looser } from './redux/selectors';  
import Main from './routes/index';
import useTelegram from './hooks/useTelegram';  
import PopapInfo from './components/PopapInfo'; 
import api from './http/index'; 
import './App.css';
  
function App() {  

  const dispatch = useDispatch();  

  const mobile = useSelector(app.mobile);  
  const appInfo = useSelector(app.appInfo);  
  const miningInfo = useSelector(app.miningInfo);  
  const user = useSelector(users.user);   
  const popup_visible_looser = useSelector(popup_looser.popup_visible_looser);   
 
  const { tg, usertg } = useTelegram();

  useEffect(()=>{
    tg.ready();
    tg.expand(); 
    tg.disableVerticalSwipes();   
  },[tg])
 
  useEffect(() => { dispatch(setMobileMod(isMobile)); },[]);  

  useEffect(() => {    
    const fetchData = async () => {  
      
      var refInfo = tg.initDataUnsafe?.start_param;
      var refIdBoss = ''; 
      var refSubkeyBoss = '';
      var refPrivatekeyBoss = ''; 
      let user =  process.env.NODE_ENV == 'development' ? await getUserInfo('6107507930') : await getUserInfo(usertg?.id);
   
      if(refInfo !== undefined) {  
        refInfo = refInfo.split('_') 
        refIdBoss = refInfo[2]; 
        refSubkeyBoss = refInfo[3];
        refPrivatekeyBoss = refInfo[1]; 
      
        if(user == 400) {
          user = await createUser({
            id: usertg?.id,
            first_name: usertg?.first_name,
            last_name: usertg?.last_name, 
          })  
        }

        let newPartnerArrs = JSON.parse(user?.partners); 
        let nastavnikArr = JSON.parse(user?.nastavnik); 
        var lockref = false;
        var duble = false; 

        newPartnerArrs.map((item)=>{
          if(item?.id == refIdBoss) {
            lockref = true
          } 
        })

        nastavnikArr.map((item)=>{ 
          if(item?.id == refIdBoss) {
            duble = true
          }
        })

        if(user?.user_id != refIdBoss && !lockref && !duble) {
            
          await set_info_user({
            userId: refIdBoss, 
            energy: JSON.stringify(4),
            date_loss_game: null
          }); 
  
          const newuser =  await setPartners({
            bossId: refIdBoss,
            partners: JSON.stringify({ id: user.user_id, name: tg.initDataUnsafe.user.username ??= tg.initDataUnsafe.user.first_name, total_coins : user.balance_count }),
            partners_twolevel: JSON.stringify([...newPartnerArrs]) 
          })   

          dispatch(set_user(newuser)); 
        } else {
          dispatch(set_user(user)); 
        } 
      } else {
        dispatch(set_user(user)); 
      } 
        
      const app = await getAppInfo(); 

      dispatch(set_appinfo(app));   
        
      const halving_ratio = 10;
      const halving_ratio_coin = 1000000; 
      const halving_to = +app?.halving_count + 1; 
      const halving_step = app?.count_coin_all / (halving_ratio_coin * halving_ratio);
      const halving_to_mine = halving_to * halving_step; 
      const halving_ratio_price = (halving_step * halving_ratio) / (halving_step * 2);
      const tile_price = (app?.halving_earn / (2048 * halving_ratio_price));

      if(app.total_coin_mine >= halving_to_mine) {
        let new_halving_earn = app?.halving_earn / 2; 
        await api.main_api.post('/putMiningInfo', { new_halving_earn, new_halving_coin: halving_to }) 
      } 
 
      dispatch(set_mininginfo({
        halving_ratio, 
        halving_ratio_coin, 
        halving_to, 
        halving_step, 
        halving_to_mine, 
        halving_ratio_price,
        tile_price, 
      }));  
  
      // dispatch(setLoadding(true)); 
    }; 

    fetchData(); 

    if (window.Telegram && window.Telegram.WebApp) { 
      window.Telegram.WebApp.expand();
      window.Telegram.WebApp.disableVerticalSwipes()
    } 
  },[]); 
    
  return ( 
    <div className="App">  
        {
          mobile ?    
          <>  
            <Main tg={ tg } user={ user } appInfo={appInfo} miningInfo={miningInfo} />  
            {
              popup_visible_looser ?  <PopapInfo tg={ tg } user={user} coin={user?.balance_count} /> : <></>
            }
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

  
