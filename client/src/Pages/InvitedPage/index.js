import React, { useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Title from '../../components/Title'  
import images from '../../assets/images'
import GetButton from '../../components/GetButton';
import LineInfoButton from '../../components/LineInfoButton';
import LineButton from '../../components/LineButton';
import { decimal } from '../../hooks/helpservice';
import './index.css';

function InvitedPage(props) { 
  const { cry, teher  } = images;
  const { tg, user } = props;

  const navigate = useNavigate();
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });
   
  return(
    <div className='invitedScreen'>
      <Title title='Invited Buddies'/>  
      {
       JSON.parse(user?.partners).length > 0 ? JSON.parse(user?.partners).map((item,i) => (
            <LineButton 
            noarrow
            title={item.name}  
            key={i}
            // smile={rocket} 
            btn={false}  
            coin={teher}
            leftTitle="" 
            leftSubTitle="" 
            rightTitle={decimal(Math.ceil(item.total_coins))} 
            rightSubTitle="Balance" 
            onClick={()=>{}}
            margin={'10px 0px 0px 0px'}
          />  
        )) : 
        <div className='invitedInfoWrapper'>
          <div className='invitedImgTileContainer'>
            <div className='invitedImgNine'>
              <img style={{ width: '40px', height: '40px'}} src={cry} />
            </div> 
          </div>  
          <div className='invitedtitle'>{`No buddies yet ;(`}</div>   
          <div className='invitedsubtitle'>{`Kinda sad, btw. Invite some and multiply your Bcoin in da future!`}</div>  
          <div className='invitedButtonContainer'> 
            <GetButton title="Invite Buddies" fill invite onClick={()=>{tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}&text=Play 2048 to earn Bcoin for free!💸`)}}/>
          </div> 
        </div>  
      }
    </div>
  );
}

export default InvitedPage;