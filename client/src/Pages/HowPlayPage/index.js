import React from 'react'; 
import Title from '../../components/Title' 
import { useNavigate } from 'react-router-dom';
import images from '../../assets/images'
import GetButton from '../../components/GetButton';
import { useSelector } from 'react-redux';
import { app } from '../../redux/selectors';
import './index.css';

function HowPlayPage(props) { 
  const { teher, arrowf } = images;
  const { tg } = props;

  const navigate = useNavigate();

  const miningInfo = useSelector(app.miningInfo); 
  const appInfo = useSelector(app.appInfo);  

  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });

  return(
    <div className='howPlayScreen'>
      <Title title='How to B da player'/> 
      <div className='howPlayInfoWrapper'>
        <div className='howPlayImgTileContainer'>
          <div style={{right: '0px'}} className='howPlayImgNine'>8</div>
          <div className='howPlayImgArrow'>
            <img src={arrowf} />
          </div>
          <div style={{left: '0px'}} className='howPlayImgNine'>8</div>
        </div> 
        <div className='howPlayInfoContainer'>
          <div className='howPlaytitle'>U see da number. U merge it with da same one.As simple as that.</div>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}> 
            <div style={{ marginRight: '10px'}}>{`U reach 2048 - u win ${appInfo.halving_earn}`}</div> 
            <img style={{ width: '20px', height: '20px'}} src={teher} />
          </div>  
          <div className='callmoreContainer'>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`2 <-> 2 = ${miningInfo.tile_price * 2}`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
          </div>
          <div className='callmoreContainer'>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`4 <-> 4 = ${miningInfo.tile_price * 4}`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`...`}</div>
          <div className='callmoreContainer'>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`1024 <-> 1024 = ${appInfo.halving_earn}`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
          </div>
          <div className='callmoreContainer'>
            <div>{`Call your Buddies to get more`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
          </div>
        </div> 
        <div className='howPlayButtonContainer'>
          <GetButton
            fill
            invite
            title="Ok, I Blieve u!" 
            onCLick={(e) => { 
              navigate('/')
            }} 
          />
        </div> 
      </div>  
    </div>
  );
}

export default HowPlayPage;