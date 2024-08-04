import React from 'react'; 
import TaskBox from '../../components/TaskBox '
import images from '../../assets/images'
import GetButton from '../../components/GetButton';
import { Link, useNavigate } from 'react-router-dom';
import './index.css';

function TaskPage(props) { 
  const { telega,teher,love, cool,rocket,arrow,selphi } = images;

  const navigate = useNavigate();

  const task = ["Подпишись на канал JetTon Games! Следи за новостями проекта и раздачами!","Подпишись на канал токена JetTon! Не упусти еженедельные раздачи и airdrop!","Запусти приложение JetTon! Всем новичкам бонус до 2000$ внутри!"]
  return(
    <div className='taskScreen'>   
      <div className='taskWrapper'> 
        <div className='taskContainer'>
          <img className='taskInfoImg' src={selphi} />  
          <div className='taskInfoTitle'>{`Jetton`}</div>
          <div className='taskInfoSubTitle'>{`Выполни задание от Jetton - первой лицинзированной гемблинг платформы на блокчейне TON и заработай 200 К Bcoin`}</div>
        </div>   
      </div>
      <div className='taskInfoBoxContainer'>
        {
          task.map((item,i) => (<TaskBox key={i} title={item} number={i+1} />))
        }  
      </div>
      <div className='taskInviteButtonContainer'>
        <GetButton title="Проверить"  fill={!false} invite={true} />
      </div> 
    </div>
  );
}

export default TaskPage;