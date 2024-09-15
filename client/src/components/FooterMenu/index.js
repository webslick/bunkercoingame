import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';   
import { useNavigate } from 'react-router-dom';
import Menubutton from '../MenuButton'   
import images from '../../assets/images';    
import './style.css'; 

function FooterMenu(props) {
  const { onClick, isHiden } = props;
  const { cry, cool, love, helpsmile }= images;
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const footers_tab = [ 
    {
      title: 'Buddies', 
      key:"buddies",
      rout: '/buddiespage',
      img: cry
    }, 
    {
      title: 'Booster', 
      key:"booster",
      rout: '/boosterpage',
      img: cool
    }, 
    { 
      title: 'Earn',
      key:"earn",
      rout: '/earnpage',
      img: love
    },
    {
      title: 'Support', 
      key:"support",
      rout: '/',
      img: helpsmile
    }  
  ];
 
if(isHiden) {
  return(<></>)
} else {
  return ( <div className='footerWrapper'>   
    {
      footers_tab.map(({ key, rout, title, img }) => {  
      return <Menubutton id={key} key={key} onClick={(e) => { onClick(e); }} active={false} title={title} img={img} rout={rout} />  
    })} 
  </div> 
);
}
 

}

export default FooterMenu;
 