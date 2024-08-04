import React from 'react'; 
import './index.css';

function Subtitle(props) {
  const { subtitle } = props; 
 
  return( 
      <div className={`subtitleContainer`}> 
        <div className='subtitle'>{subtitle}</div>
      </div>   
  );
}

export default Subtitle;