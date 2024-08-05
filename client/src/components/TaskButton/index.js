import React from 'react';
import images from '../../assets/images';
import './index.css';

function TaskButton(props) {
  const { title, img, count, subcoin, subcount,leftTitle,leftSubTitle, coin, margin, noarrow, onClick } = props;
  const { energy_img, around, arrow } = images;
 
   var string = title.split(' ').map((item, key) => {
    if(item == 'Get') {
      return
    } 
    return <div key={key}>&nbsp;{item}</div>
  })
 
  return(
    <div onClick={(e) => onClick(e)} style={{ border: `${title ? '0' : `1px solid #a08686`}`, marginTop: '10px'}} className='taskButtonContainer'> 
      <div style={{width: count ? '60%' : '90%'}} className='taskButtonLeftContainer'>
        <div className='taskButtonImgContainer'>
           <img className='taskButtonImg' src={img} /> 
        </div>
        <div className='taskButtonTitleContainer'>
          {
            !leftTitle ?  <div className='taskButtonTitle'>{title}</div>  : 
            <div className='taskButtonLeftSubContainer'>
              <div className='lineButtonLeftTitle'>{leftTitle}</div>  
              <div className='lineButtonLeftSubTitle'>{leftSubTitle}</div>  
            </div>
          } 
        </div>        
      </div>  
      <div style={{width: count ? '40%' : '10%'}} className='taskButtonRightContainer'> 
        <div className='taskButtonRightTitleContainer'>
          <div className='taskButtonRightTitle'>
            {
              count ? 
              <div className='taskButtonTitlebox'>
                <div>{`+ ${count}`}&nbsp;</div>
                <img className='taskButtonImg' src={coin} />&nbsp;
              </div>
              : <></>
            }
          </div>
          {
            subcount ?
            <div className='taskButtonRightSubTitle'>
              <div className='taskButtonTitlebox'>
                <div>{`+ ${subcount}`}&nbsp;</div>
                <img className='taskButtonImg' src={subcoin} />&nbsp;
              </div>
            </div> 
            : <></>
          }
        
        </div>  
        {
          noarrow ? <></> : <div className='taskButtonArrowContainer'>
            <img className='taskButtonArrow' src={arrow} />
          </div>
        } 
     
      </div>  
    </div>
  );
}

export default TaskButton;