import React, { useState } from 'react'; 
import SwitchButton from '../SwitchButton'
import './index.css';

function SwitcherTime(props) {
  const { title, img, subimg, time, switcher} = props; 
 
  const [active, setActive] = useState(true);
  return( 
    <div className='swichTimeWrapper'>
      <SwitchButton active={!switcher} timer={'11:28:45'} title={'Daily'} />
      <SwitchButton active={switcher} timer={false} title={'All time'} /> 
    </div>  
  );
}

export default SwitcherTime;