import React from 'react'; 
import Title from '../../components/Title'  
import images from '../../assets/images'
import { Link, useNavigate, useHistory } from 'react-router-dom';
import './index.css';
import GetButton from '../../components/GetButton';
import LineInfoButton from '../../components/LineInfoButton';

function HalvingPage(props) { 
  const { teher } = images;
  const { tg } = props;

  const navigate = useNavigate();
  const history = useHistory();

  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    // navigate('/');
    history.back();
    BackButton.hide();
  });

  return(
    <div className='halvingScreen'>
      <Title title='Halving Bcoin'/> 
      <div className='halvingInfoWrapper'>
        <div className='halvingtitle'>{`Total tokens have been mined:`}</div>  
        <LineInfoButton 
          title="6 237 520 M"  
          img={teher}  
          size={false} 
          noarr  
          onCLick={()=>{}} 
        /> 
        <div className='halvingProgressContainer'>
          <div className='halvingTopContainer'>
            <div className='halvingProgress'></div>
            <div className='halvingLable'>21 000 000 000 000</div>
          </div>
          <div className='halvingBottomContainer'>
            <div className='halvingLine'></div>   
          </div> 
        </div>
        <div className='halvingsubtitle'>{`3rd halving will be after 6 300 000 M`}</div>  
        <div className='halvingImgTileContainer'>
          <div className='halvingImgNine'>2048</div>
          <div style={{ color: 'black',margin: '0px 10px'}}>
            = 
          </div>
          <div style={{ color: 'black',fontWeight: '600',fontSize:'20px'}}>80000</div>
          <img style={{ width: '20px', height: '20px',margin: '0px 10px'}} src={teher} />
        </div>  
        <div className='halvingButtonContainer'> 
          <GetButton
            fill
            invite
            title="Start Bmine" 
            onCLick={(e) => { 
              navigate('/minepage')
            }} 
          />
        </div> 
      </div>  
    </div>
  );
}

export default HalvingPage;