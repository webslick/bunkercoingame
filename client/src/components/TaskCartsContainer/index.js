import React from 'react'; 
import TaskButton from '../TaskButton';
import { useNavigate } from 'react-router-dom';
import './index.css';

function TaskCartsContainer(props) {
  const { title, carts } = props; 
 const navigate = useNavigate();
  return(
    <div className='taskCartsContainer'>
      <div className='taskCartsTitle'>{title}</div> 
      <div className='taskCartsButtonContainer'> 
        {
          carts.map((item,key) => (
          <TaskButton
            title={item.title}
            img={item.img}
            count={item.count}
            coin={item.coin}
            subcoin={item.subcoin}
            subcount={item.subcount}
            margin={item.margin}
            noarrow={item.noarrow} 
            leftTitle={item.leftTitle}
            leftSubTitle={item.leftSubTitle}
            key={key}
            onClick={(e) => {
              navigate('/taskpage')
            }}
          />))
        } 
      </div> 
    </div> 
  );
}

export default TaskCartsContainer;
 