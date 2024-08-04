import React from 'react'; 
import Title from '../../components/Title' 
import { Link, useNavigate } from 'react-router-dom';
import images from '../../assets/images'
import './index.css';
import GetButton from '../../components/GetButton';

function HowPlayPage(props) { 
  const { back, rocket, teher, cool, helpsmile, help, agry, arrowf } = images;
  const { tg } = props;

  const navigate = useNavigate();
 
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
            <div style={{ marginRight: '10px'}}>U reach 2048 - u win 80000</div> 
            <img style={{ width: '20px', height: '20px'}} src={teher} />
          </div>  
          <div className='callmoreContainer'>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`2 <-> 2 = 15.625`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
          </div>
          <div className='callmoreContainer'>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`2 <-> 2 = 15.625`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`...`}</div>
          <div className='callmoreContainer'>
          <div style={{ display: 'flex', flexDirection: 'row', lineHeight: 1.3, color: 'black', fontSize: '16px'}}>{`2 <-> 2 = 15.625`}</div><img style={{ width: '20px', height: '20px', marginLeft: '10px'}} src={teher} /> 
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
              navigate('/minepage')
            }} 
          />
        </div> 
      </div>  
    </div>
  );
}

export default HowPlayPage;