import React from 'react';
import { Routes, Route } from 'react-router-dom';  
import MainPage from '../Pages/MainPage/';
import BuddiesPage from '../Pages/BuddiesPage/';  
import BoosterPage from '../Pages/BoosterPage/';  
import EarnPage from '../Pages/EarnPage/';         
import GamePage from '../Pages/GamePage/';    
import HistoryPage from '../Pages/HistoryPage/';    
import RankPage from '../Pages/RankPage/';    
import HowPlayPage from '../Pages/HowPlayPage';    
import HalvingPage from '../Pages/HalvingPage';    
import InvitedPage from '../Pages/InvitedPage';    
import TaskPage from '../Pages/TaskPage';    
import BestPage from '../Pages/BestPage';    
import BbcPage from '../Pages/BbcPage';    
import GroupPage from '../Pages/GroupPage';    
 
const Main = (props) => {
 
  const { user, tg, appInfo, miningInfo } = props; 

  return (
    <main>
      <Routes>
        <Route exact path='/' element={<MainPage tg={tg} user={user} />} />  
        {/* <Route path='/minepage' element={<GroupPage user={user} />} />  */}
        <Route path='/historypage' element={<HistoryPage tg={tg} user={user} />} /> 
        <Route path='/halvingpage' element={<HalvingPage tg={tg} />} /> 
        <Route path='/taskpage' element={<TaskPage tg={tg} user={user} />} /> 
        <Route path='/bestpage' element={<BestPage tg={tg} user={user} />} /> 
        <Route path='/grouppage' element={<GroupPage tg={tg} user={user} />} /> 
        <Route path='/bbcpage' element={<BbcPage tg={tg} user={user} />} /> 
        <Route path='/invitedpage' element={<InvitedPage tg={tg} user={user} />} /> 
        <Route path='/howtoplay' element={<HowPlayPage tg={tg} />} /> 
        <Route path='/rankpage' element={<RankPage tg={tg} user={user} />} /> 
        <Route path='/buddiespage' element={<BuddiesPage tg={tg} user={user} appInfo={appInfo} />} />  
        <Route path='/boosterpage' element={<BoosterPage tg={tg} user={user} />} />  
        <Route path='/earnpage' element={<EarnPage tg={tg} user={user} />} />   
        <Route path='/gamepage' element={<GamePage tg={tg} user={user} miningInfo={miningInfo} appInfo={ appInfo } />} />   
      </Routes>
    </main>
  )
} 

export default Main;