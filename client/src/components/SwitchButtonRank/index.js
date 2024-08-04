import React from 'react'; 
import './index.css';

function SwitchButtonRank(props) {
  const { title, active, img, onClick , id} = props; 
 
  return( 
    <div style={{backgroundColor: `${active == true ? 'rgb(255 255 255)' : 'none'}`}} className='switchButtonRankContainer'>
      <div id={id} onClick={(e)=>(onClick(e.target.id))} className='switchButtonRankZindex'/> 
      <img className='switchButtonRankImg' src={img} />
      <div className='switchButtonRankTitle'>{title}</div>  
    </div>  
  );
}

export default SwitchButtonRank;