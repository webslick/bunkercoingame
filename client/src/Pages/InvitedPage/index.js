import React from 'react'; 
import Title from '../../components/Title'  
import images from '../../assets/images'
import './index.css';
import GetButton from '../../components/GetButton';
import LineInfoButton from '../../components/LineInfoButton';
import LineButton from '../../components/LineButton';
import { useNavigate } from 'react-router-dom';

function InvitedPage(props) { 
  const { cry, rocket, teher, cool, helpsmile, help, agry, arrowf } = images;
  const { tg } = props;

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
      <div className='invitedUserButtonContainer'>
        <LineButton 
          title="Alex"  
          // smile={rocket} 
          btn={false}  
          coin={teher}
          leftTitle="Best game" 
          leftSubTitle="B da winner" 
          rightTitle="4560" 
          rightSubTitle="Daily result" 
        />  
      </div> 
      <div className='invitedInfoWrapper'>
        <div className='invitedImgTileContainer'>
          <div className='invitedImgNine'>
            <img style={{ width: '40px', height: '40px'}} src={cry} />
          </div> 
        </div>  
        <div className='invitedtitle'>{`No buddies yet ;(`}</div>   
        <div className='invitedsubtitle'>{`Kinda sad, btw. Invite some and multiply your Bcoin in da future!`}</div>  
        <div className='invitedButtonContainer'>
          <GetButton fill invite title="Invite Buddies" />
        </div> 
      </div>  
    </div>
  );
}

export default InvitedPage;