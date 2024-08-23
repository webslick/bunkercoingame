import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tile from "../Tile";
import Cell from "../Cell";
import { Board } from "../../helper/index";
import useEvent from "../../hooks/useEvent";
import GameOverlay from "../GameOverlay";
import GetButton from "../GetButton";
import JoinButton from "../JoinButton";
import images from "../../assets/images";
import moment from "moment";
import { app, loader, timer , users} from '../../redux/selectors'
import { useSwipeable } from 'react-swipeable'
import { putHistoryInfo, set_visibleLooser, putTotalCoin, set_appinfo } from '../../redux/actions/app'
import { set_user,set_info_user } from '../../redux/actions/users' 
import { useNavigate } from "react-router-dom";
import { convertTimeBd, NowBDformat } from '../../hooks/helpservice';
import { getIOSSaveDateObj } from '../../hooks/helpservice'
import './index.css';

const BoardView = (props) => {

  const { tg, appInfo, miningInfo } = props;
  const {teher,telega,love} = images;

  const user = useSelector(users.user); 
const loading = useSelector(loader.loading)
  const energy = useSelector(timer.energy);
 
  const hours = energy.hours;
  const minutes = energy.minutes;
  const seconds = energy.seconds; 

  const [board, setBoard] = useState(new Board({ appInfo, miningInfo }));
  const [stopScroll, setStopScroll] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(function() { 
    navigate('/');
    BackButton.hide();
  });



  const handlers = useSwipeable({
    onTap: (eventData) => { 
      setStopScroll(false)
      let dir = random(0,3);  

      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(dir);
      setBoard(newBoard);

    }, 

    onSwiped: (eventData) => { 
      setStopScroll(false)
      let dir = 0; 
      switch (eventData.dir) {
        case 'Up':
          dir = 1;
          break;
        case 'Down':
          dir = 3;
          break;
        case 'Left':
          dir = 0;
          break;
        case 'Right':
          dir = 2;
          break;
      
        default:
          break;
      } 

      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(dir);
      setBoard(newBoard);

    },  
    preventScrollOnSwipe: true,
    trackTouch: true,
    onSwipeStart: () => setStopScroll(true), 
    onTouchStartOrOnMouseDown: () => setStopScroll(true), 
    
  }); 
 
  const handleKeyDown = (event) => { 
    if (board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);
    }
  };

  useEvent("keydown", handleKeyDown);

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  // const resetGame = () => {
  //   console.log('RESTART')
  //   setBoard(new Board({ appInfo, miningInfo }));
  // };

  function isEmpty(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
    return true;
  }
  function isEmptyObject(value) {
    if (value == null) {
      // null or undefined
      return false;
    }
    if (typeof value !== 'object') {
      // boolean, number, string, function, etc.
      return false;
    }
    const proto = Object.getPrototypeOf(value);
    // consider `Object.create(null)`, commonly used as a safe map
    // before `Map` support, an empty object as well as `{}`
    if (proto !== null && proto !== Object.prototype) {
      return false;
    }
    return isEmpty(value);
  }
    
    useEffect(() => {
      if(board.hasWon()) {
       console.log('won true')
      } else if (board.hasLost()) { 
        console.log('won false',board.mine_coins)
        console.log('won false',board.score)
        console.log('user',user)   
        // resetGame()  
      
        const fetchData = async () => {  
 
        if(!isEmptyObject(user)) {  
          let historyArr = JSON.parse(user?.history);    

          if(typeof(historyArr) == 'string') { 
            let arr = [...JSON.parse(historyArr)]
            arr.push({ date_game: moment().format('DD/MM/YYYY'),total_coins: board.mine_coins })  
            await putHistoryInfo({ 
              id: user.user_id,
              history: JSON.stringify(arr)  
            })
          } else {
            historyArr.push({ date_game: moment().format('DD/MM/YYYY'),total_coins: board.mine_coins })  
            await putHistoryInfo({ 
              id: user.user_id,
              history: JSON.stringify(historyArr)  
            })
          } 
        } 
  
        let newuser =  await set_info_user({
          userId: user.user_id,
          energy: Number(user.energy) == 0 ? 0 : JSON.stringify(Number(user.energy) - 1),
          balance_count: JSON.stringify(Number(user.balance_count) + board.mine_coins),
          // date_loss_game: user.date_loss_game == null ? NowBDformat : moment(moment(user.date_loss_game).add(7,'hours').format("YYYY-MM-DD HH:mm")),
          date_loss_game: user.date_loss_game == null ? moment().format("YYYY-MM-DD HH:mm") : moment(user.date_loss_game).format("YYYY-MM-DD HH:mm"),
          score: JSON.stringify(Number(user.score) + board.score), 
          bestGame: JSON.stringify({...JSON.parse(user?.bestGame),
             daily: { score: board.score + JSON.parse(user?.bestGame).daily.score, coins: board.mine_coins + JSON.parse(user?.bestGame).daily.coins },
             all_time: { score: board.score + JSON.parse(user?.bestGame).all_time.score, coins: board.mine_coins + JSON.parse(user?.bestGame).all_time.coins },
          })
        },dispatch);
  
        let newAppInfo =  await putTotalCoin({
          total_coin_mine: JSON.stringify(Number(appInfo.total_coin_mine) + board.mine_coins)
        },dispatch);

        dispatch(set_user(newuser)); 
        dispatch(set_appinfo(newAppInfo)); 
        dispatch(set_visibleLooser(true)) 

      }
      fetchData()
      } 
    },[stopScroll])


    useEffect(()=>{
      setBoard(new Board({ appInfo, miningInfo }));
    },[loading])
   
 
    return (
    <div className="boardViewContainer">
      {
       board.hasLost() && <div className="disabletouch"></div>
      }
      <div className='boardViewTopContainer'>  
        <JoinButton title="Join" img={ telega } onClick={()=>{tg.openTelegramLink(`https://t.me/bcoin2048_RU_channel`)}} />      
        <GetButton title="Invite Buddies"  fill={!false} invite={true} onClick={()=>{tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}}&text=Play 2048 to earn Bcoin for free!💸`)}}/>
      </div>
      <div {...handlers} className="touchContainer">
      {/* <div {...handlers} style={{ touchAction: stopScroll ? 'none' : 'auto' }} className="touchContainer"> */}
        <div className="details_box">
          <div className="left_box" > 
            <div className="infoButtonWrapper" >
              <div className="resetButtonTop"> 
                  2048 
              </div>
              <div className="resetButtonBottom"> 
                  {appInfo?.halving_earn} 
                <img style={{ width: '18px', height:' 18px', marginLeft: '5px'}} src={teher} />
              </div> 
            </div>
          </div>
          <div className="rigth_box" >
            <div className="score-box">
              <div className="scoreBoxTop" >
              Score:
              </div>
              <div className="scoreBoxBottom" >
              {board.score}
              </div>
            </div>
            <div className="score-box">
              <div className="scoreBoxTop" >
              Your mine:
              </div>
              <div className="scoreBoxBottom" >
              {board.mine_coins}
              <img style={{ width: '18px', height:' 18px', marginLeft: '5px'}} src={teher} />
              </div>
            </div> 
          </div> 
        </div>
        <div className="board">
          {cells}
          {tiles} 
        </div>
      </div>
    </div>
  );
};

export default BoardView;
