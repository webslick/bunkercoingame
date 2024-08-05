import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toImg, slideSecond, stop } from '../utils'; 
import { visible_footer } from '../../redux/actions/app'
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



const Slider = (props) => {
 
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
 
    setTrail(move.x);
    
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
        <div className='slider_number_noactive'>2</div>
        <div className='slider_label' style={{ opacity: solving ? 0 : 1 }} >
          <span>merge tile and  start mining</span>
        </div>
        <div
          className={`slider_mask ${sliderVariant.className}`}
          style={{ width: `${trail + 60}px` }}
        />
        <div className='slider_container' draggable={false} />
        <div
          className={`slider_control ${sliderVariant.className}`}
          style={{ left: `${trail}px` }}
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
