import React from 'react';
import './index.css';
import InfoButton from '../InfoButton'
import images from '../../assets/images';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { set_visibleLooser } from '../../redux/actions/app'
import { setLoadding } from '../../redux/actions/loader'

function PopapInfo(props) {
  const { coin, user, tg } = props;
  const { cool,teher } = images;

  const navigate = useNavigate()
  const dispatch = useDispatch()
console .log(tg)
  return(
    <div className='popapInfoWrapper' >
      <div className='popapInfoImgContainer' >
        <img className='imgPopInfo' src={cool} alt="" />
      </div>
      <div className='popapInfoWinContainer' >
        <div>{`Ты = Выиграл`}</div> 
        <div className='popapTitle'>
          <div>{`Ты заработал: ${coin} `}</div>
          <img style={{marginLeft: '10px'}} width={25} src={teher} />
        </div>
      </div>
      <div className='popapInfoButtonContainer' >
        <div className='popapInfoButtonContainerUp'>
          <InfoButton width={ Number(user.energy) == 0 } fill={ Number(user.energy) == 0 } title={'Ну, я пошёл'} onClick={() => {
              dispatch(set_visibleLooser(false));
              navigate('/');
            }}
          />
          {
           Number(user.energy) != 0 ? <InfoButton teher={teher} fill title={'Ещё разок!  1⚡️'} onClick={()=>{navigate('/gamepage'); dispatch(set_visibleLooser(false)); dispatch(setLoadding(true))}} />:<></>
          }
        </div>
        <div className='popapInfoButtonContainerDown'>
          <InfoButton title={'Поделиться результатом 📩'} onClick={() => {
            tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}&text=I earned ${coin} bunkercoins. Join us quickly and start earning money.!💸`);
          }}  />
        </div> 
      </div>
    </div>
  );
}
 
export default PopapInfo;