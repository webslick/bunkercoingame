import React from 'react'; 
import TaskButton from '../TaskButton';
import { useNavigate } from 'react-router-dom';
import images from '../../assets/images';
import './index.css';

function TaskCartsContainer(props) {
  const { title, carts } = props; 
  const { rocket, teher } = images; 

 const navigate = useNavigate();
 
  return(
    <div className='taskCartsContainer'>
      <div className='taskCartsTitle'>{title}</div> 
      <div className='taskCartsButtonContainer'> 
        {
          carts.map((item,key) => ( 
            <TaskButton
              title={''}
              img={rocket}
              count={item.total_coins}
              coin={teher}
              subcoin={''}
              subcount={''}
              margin={''}
              noarrow={true} 
              leftTitle={'You'}
              leftSubTitle={'4 ur gamez'}
              key={key}
              onClick={(e) => {}}
            />  
          ))
        } 
      </div> 
    </div> 
  );
}

export default TaskCartsContainer;
 