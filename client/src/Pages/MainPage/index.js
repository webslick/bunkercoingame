import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EnergyInfo from '../../components/EnergyInfo'
import { Link, useNavigate } from 'react-router-dom';
import JoinButton from '../../components/JoinButton'
import LineButton from '../../components/LineButton'
import LineInfoButton from '../../components/LineInfoButton' 
import FooterMenu from '../../components/FooterMenu';
import Slider from '../../components/Sliders' 
import { change_page, visible_footer , putHistoryInfo} from '../../redux/actions/app' 
import { pages } from '../../redux/selectors'; 
import { decimal } from '../../hooks/helpservice';
import images from '../../assets/images'
import moment from 'moment';
import './index.css';

function MainPage(props) { 
  const { user, tg } = props;
  const { telega,teher,love, cool,rocket,arrow,selphi } = images;

  const navigate = useNavigate();
  const dispatch = useDispatch();  
  
 
  return(
    <div className='mainscreen'>
      <div className='energyTopContainer'>
        <EnergyInfo user={user} activeTimer={Number(user.energy) !== 4} />
        <div className='joinButtonBox'>
          <JoinButton title="Join" img={ telega } onClick={()=>{tg.openTelegramLink(`https://t.me/bcoin2048_RU_channel`)}} />   
        </div>
      </div>
      <div className='inviteContainer'>
        <LineButton 
          title="Get for invites"
          smile={love} 
          btn={true} 
          coin={teher} 
          onClick={()=>{tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}}&text=Play 2048 to earn Bcoin for free!💸`)}} 
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
            {/* <LineInfoButton 
              title="Play to get ranked"  
              img={selphi}  
              size={false} 
              onClick={(e) => { 
                navigate('/rankpage')
              }}  
            />  */}
          </div>
          <div className='mainInfoBlockSliderContainer'> 
            <Slider disabled={Number(user.energy) == 0} dateLoss={user.date_loss_game} />
          </div>  
          <LineButton 
            title=""  
            smile={rocket} 
            btn={false}  
            coin={teher}
            leftTitle="Best game" 
            leftSubTitle="B da winner" 
            rightTitle={decimal(Math.ceil(user.score))} 
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
      {/* <div className='buddiesContainer'>
        <LineButton 
          title="Big buddies Crew"  
          smile={cool} 
          btn={false} 
          coin={teher} 
          onClick={(e) => { 
            navigate('/bbcpage')
          }} 
        /> 
      </div>  */}
      <div className='footerBox'> 
        <FooterMenu 
          // page={ page }
          onClick={(e) => {  
            dispatch(change_page(e.target.id)) 
          }}  
        /> 
      </div> 
    </div>
  );
}

export default MainPage;