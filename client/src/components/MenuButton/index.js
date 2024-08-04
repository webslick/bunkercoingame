import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

function Menubutton(props) {
  const { id, title, img, active, rout, onClick } = props; 
 
  return(
    <Link className={`menuButtonContainer`} to={rout}> 
      <div id={id} onClick={onClick} className='buttonDevice' />
      <div className={`${active ? 'menuButtonActive' : 'menuButton'}`}>
        <img className='menuButtonImg' src={img} /> 
        <div className='menuButtonTitle'>{title}</div>
      </div>  
    </Link>
  );
}

export default Menubutton;