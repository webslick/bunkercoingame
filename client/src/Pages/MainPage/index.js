import React, { useEffect } from 'react';
import EnergyInfo from '../../components/EnergyInfo'
import JoinButton from '../../components/JoinButton'
import { useDispatch, useSelector } from 'react-redux';
import LineButton from '../../components/LineButton'
import LineInfoButton from '../../components/LineInfoButton' 
import Slider from '../../components/Sliders' 
import { Link, useNavigate } from 'react-router-dom';
import images from '../../assets/images'
import { change_page, visible_footer } from '../../redux/actions/app' 
import { pages } from '../../redux/selectors'; 
import FooterMenu from '../../components/FooterMenu';
import './index.css';

function MainPage(props) { 
  const { telega,teher,love, cool,rocket,arrow,selphi } = images;

  const navigate = useNavigate();
  const dispatch = useDispatch();  

  const page = useSelector(pages.page); 
 
  return(
    <div className='mainscreen'>
      <div className='energyTopContainer'>
        <EnergyInfo energy={4} activeTimer={!false} time={'22:05:56'}/>
        <div className='joinButtonBox'>
          <JoinButton title="Join" img={ telega } />   
        </div>
      </div>
      <div className='inviteContainer'>
        <LineButton 
          title="Get for invites"
          smile={love} 
          btn={true} 
          coin={teher} 
        /> 
      </div>
      <div className='mainInfoBlock'>
        <div className='mainSubInfoBlock'> 
          <div className='LineInfoButtonContainer'> 
            <LineInfoButton 
              title="30 K"  
              img={teher}  
              size={true}   
              onCLick={(e) => { 
                navigate('/historypage')
              }} 
            /> 
            <LineInfoButton 
              title="Play to get ranked"  
              img={selphi}  
              size={false} 
              onCLick={(e) => { 
                navigate('/rankpage')
              }}  
            /> 
          </div>
          <div className='mainInfoBlockSliderContainer'> 
            <Slider />
          </div>  
          <LineButton 
            title=""  
            smile={rocket} 
            btn={false}  
            coin={teher}
            leftTitle="Best game" 
            leftSubTitle="B da winner" 
            rightTitle="4560" 
            rightSubTitle="Ur dally score" 
            onCLick={(e) => { 
              navigate('/bestpage')
            }} 
          />  
          <Link className='mainInfoLink' to="/howtoplay"><div>How to play?</div></Link>
        </div>
        <Link className='mainHalwingLinkContainer' to="/halvingpage"> <div className='mainHalwingLinkContainer'>
          <div className='mainHalwingLinkTitle'>Bunkertoken halving</div>  
          <img className='mainHalwingLinkArrow' src={arrow} />
        </div>  </Link>
      </div>
      {/* <div className='buddiesContainer'>
        <LineButton 
          title="Big buddies Crew"  
          smile={cool} 
          btn={false} 
          coin={teher} 
          onCLick={(e) => { 
            navigate('/bbcpage')
          }} 
        /> 
      </div>  */}
      <div className='footerBox'> 
        <FooterMenu 
          page={ page }
          onClick={(e) => { 
            console.log(e)
            localStorage.setItem('page',e.target.id);
            dispatch(change_page(e.target.id)) 
          }}  
        /> 
      </div> 
    </div>
  );
}

export default MainPage;