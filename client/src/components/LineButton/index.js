import React from 'react';
import images from '../../assets/images';
import './index.css';

function LineButton(props) {
  const { title, smile, btn, leftTitle, rightTitle, leftSubTitle, rightSubTitle, coin, onCLick } = props;
  const { energy_img, around, arrow } = images;
 
  if(title) {
    var string = title.split(' ').map((item, key) => {
      if(item == 'Get') {
        return <div className='lineButtonTitlebox' key={key}><div>{`${item} `}&nbsp;</div><img className='lineButtonSmile' src={coin} />&nbsp;</div> 
      } 
      return <div key={key}>&nbsp;{item}</div>
    })
  }  
 
  return(
    <div onClick={(e) => (onCLick(e))} style={{ border: `${title ? '0' : `1px solid #a08686`}`, backgroundColor: smile ? 'rgb(227, 181, 122)' : 'rgb(255, 231, 200)'}} className='lineButtonContainer'> 
      <div className='lineButtonLeftContainer'>
        <div  style={{ border: `${title ? '0' : `1px solid #a08686`}`, backgroundColor: smile ? '#faebd7' : '#e9af47'}} className='lineButtonSmileContainer'>
          {
            smile ? <img className='lineButtonSmile' src={smile} /> : <div className='lineButtonName'>{title[0]}</div>
          } 
        </div>
        <div className='lineButtonLeftTitleContainer'>
          {
            title ? <div className='lineButtonTitle'>{string}</div>  : 
            <>
              <div className='lineButtonLeftTitle'>{leftTitle}</div>  
              <div className='lineButtonLeftSubTitle'>{leftSubTitle}</div>  
            </>
          } 
        </div>      
      </div>  
      <div className='lineButtonRightContainer'>
        {

          smile ? title ? <></> :
          <div className='lineButtonRightTitleContainer'>
            <div className='lineButtonRightTitle'>{rightTitle}</div>
            <div className='lineButtonRightSubTitle'>{rightSubTitle}</div> 
          </div> : <div className='lineButtonRightTitleContainer'>
            <div className='lineButtonRightImgContainer'>
              <div className='lineButtonRightTitle'>{rightTitle}</div>
              <img style={{ width: '15px', height: '15px', marginLeft: '5px'}} className='lineButtonSmile' src={coin} />
            </div> 
            <div className='lineButtonRightSubTitle'>{rightSubTitle}</div> 
          </div>
        }
        {
          btn ? 
          <div className='lineButtonInviteContainer'>
            <div className='lineButtonInviteTitle'>Invite</div>  
          </div>
          :
          <div className='lineButtonArrowContainer'>
            <img className='lineButtonArrow' src={arrow} />
          </div>
        } 
      </div>  
    </div>
  );
}

export default LineButton;