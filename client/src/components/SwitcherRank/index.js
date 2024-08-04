import React, { useState } from 'react'; 
import SwitchButtonRank from '../SwitchButtonRank'
import images from '../../assets/images';
import './index.css';

function SwitcherRank(props) {
  const { title, img, subimg, time } = props; 
  const { gold, bronze, silver} = images
 
  const [active, setActive] = useState(0);

  const arr = [{
    title:'Bronze',
    img: bronze
  },{
    title:'Silver',
    img: silver
  },{
    title:'Gold',
    img: gold
  }];
 
  return( 
    <div className='swichRankWrapper'> 
      {
        arr.map((item,key) => (<SwitchButtonRank
          id={key} key={key} 
          active={key == active ? true : false}
          img={item.img}
          title={item.title} 
          onClick={(id) => { setActive(id) }}
          />))
      }  
    </div>  
  );
}

export default SwitcherRank;