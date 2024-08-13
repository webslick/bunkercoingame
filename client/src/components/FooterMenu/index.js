import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';   
import { Link, useNavigate } from 'react-router-dom';
import Menubutton from '../MenuButton'  
import { change_page } from '../../redux/actions/app'; 
import images from '../../assets/images';    
import './style.css'; 

function FooterMenu(props) {
  const { onClick, isHiden } = props;
  const { cringe, cry, cool, love, helpsmile }= images;
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {    
  //   // dispatch(change_page(localStorage.getItem('page'))); 
  //   // dispatch(setPopupMainMsg(''));
  // },[page]); 
  
  const footers_tab = [
    // {
    //   title: 'Mine', 
    //   key:"main",
    //   rout: '/minepage',
    //   img: cringe
    // }, 
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
  
//   const content = (
//     <div>  

//       <div className={`profiletab`} onClick={() => { dispatch(change_visible_popup(true));dispatch(change_visible_popover(false)) }}>{'Создать страницу'}</div>
//       <Link to={'/mypages'}> <div  onClick={() => {dispatch(change_visible_popover(false))}}  className={`profiletab`}>{'Мои страницы'}</div></Link> 
//       <div className="arrow_container">
//         <img onClick={() => setIstoogle(!isToggleOn)} className={`arrow_rotate ${!isToggleOn ? 'on_arrow' : 'off_arrow' }`} src={arrowdown} alt="logo" width="15" height="15" />
//         <div className={`${mobile ? 'mobileArrowTitle' : "arrow_title"}`} onClick={() => setIstoogle(!isToggleOn)}>{'Партнёрам'}</div>
//       </div>
//       <div className="arrowselect_container">

// {!isToggleOn ? <div  id="myqrcodes" className={`refbal`} onClick={() => {  }}>  
//       <div className='textbal'>Реферальный баланс: <span style={{color: '#026ec7'}}>{ balance }</span> руб.</div>
//       <div className='textref'>
//         <div>Реферальная ссылка: </div>
//         <span style={{color: '#026ec7', textAlign: 'center',marginTop: '7px'}}>{`https://inmemory-forever.com/api/partners/${partnerlink}`}</span>
//         </div> 
//         {/* <CopyToClipboard text={`https://inmemory-forever.com/api/partners/${partnerlink}`}>
//           <button className="wrapperOrangeButton textOrangeButton copyBtn" style={{ 
//             fontSize: '16px',
//             with: '200px', 
//             height: '35px'
//           }} >Скопировать url</button>
//         </CopyToClipboard> */} 
      
//           <QRCode
//             value={`https://inmemory-forever.com/api/partners/${partnerlink}`}
//             bgColor="white"
//             style={{
//               marginBottom: 16,
//             }}
//           />
//             <div className='qrbtncontainer'>
//           <Button type="primary" onClick={downloadQRCode}> Скачать </Button> 
//           <RWebShare
//           data={{
//             text: "Сервис памяти о близких, с вами поделились реферальной ссылкой: ",
//             url: `https://inmemory-forever.com/api/partners/${partnerlink}`,
//             title: "Поделиться c близкими: ",
//           }}
//           onClick={() => {
          
//             // const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
//             // if (canvas) {
//             //   const url = canvas.toDataURL(); 
//             //   setUrl(url)
//             // }
//           }}
//         >
//         <Button style={{ marginLeft: '15px' }} type="primary" onClick={() => { 
        
//         }}>
//           <ShareAltOutlined />
//         </Button>  
//         </RWebShare> 
//         </div>
    
//       <OrangeButton text='Запросить вывод' margin="10px 0px 10px 0px" styles={{fontSize: '16px'}} width={200} height={35} onClick={() => {dispatch(change_visible_referal_popup(true))}} disabled={ payinfo != 2 } />
// </div> : ''}
// </div>   
//       <div className={`profiletab`} onClick={() => { dispatch(change_visible_popover(false));logout(dispatch);   dispatch(set_user_isauth(false)); navigate('/') }}>{'Выход'}</div>
//     </div>
//   );
 
 
if(isHiden) {
  return(<></>)
} else {
  return ( <div className='footerWrapper'>   
    {
      footers_tab.map(({ key, rout, title, img }) => {  
      return <Menubutton id={key} key={key} onClick={(e) => { onClick(e); }} active={false} title={title} img={img} rout={rout} /> 
      // return <Menubutton id={key} key={key} onClick={(e) => { onClick(e); }} active={key === page ? key == 'support' ? false : true : false} title={title} img={img} rout={rout} /> 
    })} 
  </div> 
);
}
 

}

export default FooterMenu;
 