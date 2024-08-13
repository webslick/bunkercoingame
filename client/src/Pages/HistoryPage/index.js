import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment'; 
import Title from '../../components/Title';
import { users } from '../../redux/selectors';
import TaskCartsContainer from '../../components/TaskCartsContainer/index';
import './index.css';

function HistoryPage(props) {  
  const { tg } = props;

  const navigate = useNavigate();
  
  const user = useSelector(users.user)
  const [isSorted, setIsSorted] = useState(false);
  const [sorted, setSorted] = useState([]);

  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });


  useEffect(()=> { 
    let historyArr =  user?.history == undefined ? {} :JSON.parse(user?.history);   
    if(typeof(historyArr) == 'string') { 
      let arr = [...JSON.parse(historyArr)]
      setSorted(arr.sort((user1, user2) => {console.log(user1); return compare(user1["date_game"],user2["date_game"])}));
    }   
    setIsSorted(true)
  },[isSorted])


  function compare(dateTimeA, dateTimeB) {
      var momentA = moment(dateTimeA,"DD/MM/YYYY");
      var momentB = moment(dateTimeB,"DD/MM/YYYY");
      if (momentA > momentB) return 1;
      else if (momentA < momentB) return -1;
      else return 0;
  }
 
  let sortedArr = sorted.reduce((acc, elem) => {
    (acc[elem.date_game] ??= []).push(elem); 
    // acc[elem.date] = (acc[elem.date] || []).concat([elem])
    return acc;
  }, {});
 
  return(
    <div className='historyScreen'>
      <Title title='History Bcoin'/>  
      { 

        Object.values(sortedArr).length != 0  ? 
        Object
        .values(
          sortedArr 
        ).map((item,i) => {   
          return <TaskCartsContainer key={i} title={item[0].date_game} carts={item} />
        } )  :

          <div className='emptyContainer'>
            <div className='emptyTitle'>You have never played. Start the game faster and reach a high level!</div>
          </div> 
      }

    </div>
  );
}

export default HistoryPage;