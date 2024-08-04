import React from 'react'; 
import Title from '../../components/Title' 
import TaskCartsContainer from '../../components/TaskCartsContainer/index'
import images from '../../assets/images'
import { useNavigate } from 'react-router-dom';
import './index.css';
import GetButton from '../../components/GetButton';

function HistoryPage(props) { 
  const { back, rocket, teher, cool, helpsmile, help, agry } = images;
  const { tg } = props;

  const navigate = useNavigate();
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });
  let carts = [
  [
    {
      title: "Ladesov Crypto",
      img: cool,
      count: '350',
      coin: teher,
      subcoin: rocket,
      subcount: "",
      margin: "",
      leftTitle: 'You',
      leftSubTitle: '4 ur games',
      noarrow: true
    },
  ],
  [
    {
      title: "Ladesov Crypto",
      img: cool,
      count: '2350',
      coin: teher,
      subcoin: rocket,
      subcount: "",
      margin: "",
      leftTitle: 'You',
      leftSubTitle: '4 ur games',
      noarrow: true
    },
    {
      title: "Ladesov Crypto",
      img: cool,
      count: '503',
      coin: teher,
      subcoin: rocket,
      subcount: "",
      margin: "",
      leftTitle: 'You',
      leftSubTitle: '4 ur games',
      noarrow: true
    },
    {
      title: "Ladesov Crypto",
      img: cool,
      count: '50',
      coin: teher,
      subcoin: rocket,
      subcount: "",
      margin: "",
      leftTitle: 'You',
      leftSubTitle: '4 ur games',
      noarrow: true
    },
  ]]

  let titles= ['03/07/2024','05/07/2024','04/08/2024','03/23/']

  return(
    <div className='historyScreen'>
      <Title title='History Bcoin'/>  
      {
        carts.map((item,i) => (<TaskCartsContainer key={i} title={titles[i]} carts={item} /> ))
      }

    </div>
  );
}

export default HistoryPage;