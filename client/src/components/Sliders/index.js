import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toImg, slideSecond, stop } from '../utils'; 
import { visible_footer } from '../../redux/actions/app'
import TimerDaily from '../TimerDaily'
import moment from 'moment'
import './style.css'; 
  
const slider = {
  default: {
    className: 'default',
    icon: 'arrow',
    color: '#000',
    spin: false,
  }, 
  active: {
    className: 'active',
    icon: 'arrow',
    color: '#fff',
    spin: false,
  },
 
};
 
const Slider = ({ disabled, dateLoss }) => {
 
  const [sliderVariant, setSliderVariant] = useState(slider.default);
  const [solving, setSolving] = useState(false); 
  const [origin, setOrigin] = useState(0);
  const [trail, setTrail] = useState(0);
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const handleStart = (e) => {
    // stop(e); 
    setOrigin(e.clientX || e.touches[0].clientX);
    setSolving(true);
    setSliderVariant(slider.active); 
  };

  const handleMove = (e) => {
    // stop(e);
  
    if (!solving) return;

    const move = {
      x: (e.clientX || e.touches[0].clientX) - origin, 
    };
 
    if (move.x > 249 || move.x < 0) return; // Don't update if outside bounds of captcha

    if(!disabled) {
      setTrail(move.x);
    }   
  };

  const handleEnd = async () => {
    if (!solving) return; 
    if(trail > 240) {
      dispatch(visible_footer(true));
      navigate('/gamepage');
    } else {
      setTrail(0);   
      setSolving(false);
    }
  };

  const handleEnter = () => {
    if (solving) return;
    setSliderVariant(slider.active);
  };

  const handleLeave = () => {
    if (solving) return;
    setSliderVariant(slider.default);
  };

  function setmoment(count,time) {
  
    let t = '';
    switch (time) {
      case 'd':
          t = 'day';
        break;
      case 'h':
        t = 'hours';
        break;
      case 'm':
        t = 'minutes';
        break;
      case 's':
        t = 'seconds';
        break; 
      default:
        t = 'day';
        break;
    }
 
    return moment(dateLoss).add(count, t) 
  }


  return (
    <div
      className='slider' 
      draggable={false}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    > 
      <div className='slider_container'>
        <div className='slider_track' />
        <div
        className='slider_number_noactive'
        style={{ background: disabled ? '#c9c9c9' : 'linear-gradient(150deg, rgb(199 195 181) 0%, rgb(225 172 81 / 44%) 41%, rgb(216 214 208) 100%)'}}
        >2</div>
        <div className='slider_label' style={{ opacity: solving ? 0 : 1 }} >
          {
            disabled ? 
            <div>
            <span>Ждите</span> 
            <TimerDaily 
              deadline={ setmoment(6,'h') } 
              onTime={() => {
                console.log('timer stoping!')
              }} 
            /> </div>




            : <span>merge tile and  start mining</span>
          } 
        </div>
        <div
          className={`slider_mask ${sliderVariant.className}`}
          style={{ width: `${trail + 60}px` }}
        />
        <div className='slider_container' draggable={false} />
        <div 
          style={{left: `${trail}px`,background: disabled ? '#c9c9c9' : 'linear-gradient(139deg, #ffea00 -.13%, #f2a600 61.62%, #fe6819 100.83%)'}}
          className={`slider_control ${sliderVariant.className}`} 
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        > 
          <div className='slider_number'>2</div>
        </div> 
      </div>
    </div>
  );
};
 
export default Slider;
