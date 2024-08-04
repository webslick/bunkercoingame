import React from 'react'; 
import './index.css';

function Title(props) {
  const { title } = props; 
 
  return( 
      <div className={`titleContainer`}> 
        <div className='title'>{title}</div>
      </div>   
  );
}

export default Title;