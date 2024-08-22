import React, { useEffect, useState } from 'react'; 
import Title from '../../components/Title'  
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import GetButton from '../../components/GetButton';
import LineInfoButton from '../../components/LineInfoButton';
import { set_progress, getAppInfo, putMiningInfo, set_appinfo, set_mininginfo } from '../../redux/actions/app';
import { app } from '../../redux/selectors';
import './index.css';
import { decimal } from '../../hooks/helpservice';

function HalvingPage(props) { 
  const { tg } = props;
  const { teher } = images;

  const navigate = useNavigate(); 
  const dispatch = useDispatch();  

  const miningInfo = useSelector(app.miningInfo); 
  const appInfo = useSelector(app.appInfo); 
  const progress = useSelector(app.progress); 

  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });

  useEffect(() => {    
    const fetchData = async () => { await getAppInfo(dispatch) }; 
    fetchData(); 
  },[miningInfo.tile_price]);  
 
  useEffect(() => {  
    
    let allWidthProgressLine = +window.getComputedStyle(document.getElementsByClassName('halvingTopContainer')[0],null).getPropertyValue('width').split('px')[0];
   
    let ratioPercent = (+appInfo.count_coin_all / +appInfo.total_coin_mine);
    let percentToMine = 100 / ratioPercent ; // намайнено
 
    let allWithLine = document.getElementsByClassName('halvingBottomContainer')[0].clientWidth;
    let lineToMine = allWithLine * percentToMine; 
 
    let allWithLineProgress = +window.getComputedStyle(document.getElementsByClassName('halvingLine')[0],null).getPropertyValue('left').split('px')[0];
    let lineToMineProgress = (allWithLineProgress * +appInfo.total_coin_mine) / miningInfo.halving_to_mine;  
 
    dispatch(set_progress({
      line: lineToMine,
      delimetr: lineToMineProgress, 
    })); 

  },[appInfo]) 
  
  return(
    <div className='halvingScreen'>
      <Title title='Halving Bcoin'/> 
      <div className='halvingInfoWrapper'>
        <div className='halvingtitle'>{`Total tokens have been mined:`}</div>  
        <LineInfoButton 
          title={`${decimal(Math.ceil(appInfo.total_coin_mine))}`}  
          img={teher}  
          size={false} 
          noarr  
          onClick={()=>{}} 
        /> 
        <div className='halvingProgressContainer'>
          <div className='halvingTopContainer'>
            <div style={{width: `${progress.line}px`}} className='halvingProgress'></div>
            <div className='halvingLable'>{appInfo.count_coin_all}</div>
          </div>
          <div className='halvingBottomContainer'>
            <div style={{left: `${progress.delimetr}px`}} className='halvingLine'></div>   
          </div> 
        </div>
        <div className='halvingsubtitle'>{`${miningInfo.halving_to}rd halving will be after ${decimal(miningInfo.halving_to_mine)}`}</div>  
        <div className='halvingImgTileContainer'>
          <div className='halvingImgNine'>2048</div>
          <div style={{ color: 'black',margin: '0px 10px'}}>
            = 
          </div>
          <div style={{ color: 'black',fontWeight: '600',fontSize:'20px'}}>{appInfo.halving_earn}</div>
          <img style={{ width: '20px', height: '20px',margin: '0px 10px'}} src={teher} />
        </div>  
        <div className='halvingButtonContainer'> 
          <GetButton
            fill
            invite
            title="Start Bmine" 
            onClick={(e) => {  
              navigate('/');
            }} 
          />
        </div> 
      </div>  
    </div>
  );
}

export default HalvingPage;