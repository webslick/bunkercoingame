import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import EnergyInfo from '../../components/EnergyInfo'
import { Link, useNavigate } from 'react-router-dom';
import JoinButton from '../../components/JoinButton'
import LineButton from '../../components/LineButton'
import LineInfoButton from '../../components/LineInfoButton' 
import FooterMenu from '../../components/FooterMenu';
import Slider from '../../components/Sliders' 
import { change_page } from '../../redux/actions/app'   
import { decimal, isEmptyObject } from '../../hooks/helpservice';
import images from '../../assets/images' 
import './index.css'; 

function MainPage(props) { 
  const { user, tg } = props;
  const { telega,teher,love, rocket,arrow } = images;

  const navigate = useNavigate();
  const dispatch = useDispatch();  
 
  let daily_score = 0; 

  if(!isEmptyObject(user)) {  
    daily_score = JSON.parse(user?.bestGame).daily.score;   
  }
 
  return(
    <div className='mainscreen'>
      <div className='energyTopContainer'>
        <EnergyInfo user={user} activeTimer={Number(user.energy) !== 4} />
        <div className='joinButtonBox'>
          <JoinButton title="Join" img={ telega } onClick={()=>{tg.openTelegramLink(`https://t.me/BitBunke`)}} />   
        </div>
      </div>
      <div className='inviteContainer'>
        <LineButton 
          title="Get for invites"
          smile={love} 
          btn={true} 
          coin={teher} 
          onClick={()=>{ 
            tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}&text=Play 2048 to earn BitBunke for free!💸`)
          }} 
        /> 
      </div>
      <div className='mainInfoBlock'>
        <div className='mainSubInfoBlock'> 
          <div className='LineInfoButtonContainer'> 
            <LineInfoButton 
              title={decimal(Math.ceil(user.balance_count))}  
              img={teher}  
              size={true}   
              onClick={async(e) => {  
                navigate('/historypage')
              }} 
            />  
          </div>
          <div className='mainInfoBlockSliderContainer'> 
            <Slider wait={Number(user.energy) == 0 ? false : user?.wait} disabled={Number(user.energy) == 0} dateLoss={user.date_loss_game} userId={user?.user_id} />
          </div>  
          <LineButton 
            title=""  
            smile={rocket} 
            btn={false}  
            coin={teher}
            leftTitle="Best game" 
            leftSubTitle="B da winner" 
            rightTitle={decimal(Math.ceil(daily_score))} 
            rightSubTitle="Ur dally score" 
            onClick={() => {  navigate('/bestpage') }} 
          />  
          <Link className='mainInfoLink' to="/howtoplay"><div>How to play?</div></Link>
        </div>
        <Link className='mainHalwingLinkContainer' to="/halvingpage"> <div className='mainHalwingLinkContainer'>
          <div className='mainHalwingLinkTitle'>Bunkertoken halving</div>  
            <img className='mainHalwingLinkArrow' src={arrow} />
          </div>  
        </Link>
      </div> 
      <div className='footerBox'> 
        <FooterMenu  
          onClick={(e) => {  
            dispatch(change_page(e.target.id)) 
          }}  
        /> 
      </div> 
    </div>
  );
}

export default MainPage;