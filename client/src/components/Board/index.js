import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tiles from "../Tiles";
import Cell from "../Cell";
import { Board, Tile } from "../../helper/index";
import useEvent from "../../hooks/useEvent";
import GameOverlay from "../GameOverlay";
import GetButton from "../GetButton";
import JoinButton from "../JoinButton";
import images from "../../assets/images";
import moment from "moment";
import { app, loader, timer , users} from '../../redux/selectors'
import { useSwipeable } from 'react-swipeable'
import { putHistoryInfo, putBoardState, set_visibleLooser, putTotalCoin, set_appinfo, set_wait,set_wait_count } from '../../redux/actions/app'
import { set_user,set_info_user,getAllArrayIds } from '../../redux/actions/users' 
import { setLoadding } from '../../redux/actions/loader'
import { useNavigate } from "react-router-dom";
import { isEmptyObject } from '../../hooks/helpservice';
import { getIOSSaveDateObj } from '../../hooks/helpservice';
 
import './index.css';

 
const BoardView = (props) => {
 
  const { tg, appInfo, miningInfo } = props;
  const {teher,telega} = images;

  const user = useSelector(users.user); 
  const loading = useSelector(loader.loading)
  const energy = useSelector(timer.energy);
  const wait = useSelector(app.wait); 
 
  const [board, setBoard] = useState(isEmptyObject(JSON.parse( user.boardstate )) ? new Board({ miningInfo }) : new Board({ ...JSON.parse(user.boardstate) ,miningInfo }))
 
  const [stopScroll, setStopScroll] = useState(false);
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
 
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
 
  const BackButton = tg.BackButton;
  BackButton.show();

  BackButton.onClick(async function() { 
    let newUser =  await putBoardState({ 
      id: user.user_id,
      boardstate: { cells: board.cells, tiles: board.tiles, score: board.score, mine_coins: board.mine_coins }
    })
    dispatch(set_user(newUser))
    dispatch(set_wait(true)); 
    dispatch(set_wait_count(10))
    BackButton.hide();
    navigate('/');
  });
 
  const handlers = useSwipeable({
    onTap: async (eventData) => { 
      setStopScroll(false)
      let dir = random(0,3);   
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );  
      let newBoard = boardClone.move(dir);  
      setBoard(newBoard) 
    }, 

    onSwiped: async (eventData) => { 
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

  const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => (<Tiles tile={tile} key={index} />));
  
    useEffect(() => {
      if(board.hasWon()) {
       console.log('won true')
      } else if (board.hasLost()) {    
        const fetchData = async () => {  
        await putBoardState({ 
          id: user.user_id,
          boardstate: {}
        });

        if(!isEmptyObject(user)) {  
          let historyArr = JSON.parse(user?.history);    
          let nastavnik = JSON.parse(user?.nastavnik); 
          let nastavnikArrOne = []
          let nastavnikArrTwo = []
 
          if(nastavnik.length > 0) {

            nastavnik.map((item)=>nastavnikArrOne.push(item.id));
            let usersBoss = await getAllArrayIds(nastavnikArrOne);
         
            usersBoss.forEach(async (element) => {
              JSON.parse(element.nastavnik).map((el)=>nastavnikArrTwo.push(el.id));
              await set_info_user({
                userId: element.user_id, 
                balance_count: JSON.stringify(Number(element.balance_count) + (board.mine_coins/2))
              },dispatch);
            });

            let usersBossTwo = await getAllArrayIds(nastavnikArrTwo);

            usersBossTwo.forEach(async (element) => { 
              await set_info_user({
                userId: element.user_id, 
                balance_count: JSON.stringify(Number(element.balance_count) + (board.mine_coins/4))
              },dispatch);
            });

          }
 
          if(typeof(historyArr) == 'string') { 
            let arr = [...JSON.parse(historyArr)]
            arr.push({ date_game: moment().format('DD/MM/YYYY'),total_coins: board.mine_coins, total_score: board.score })  
            await putHistoryInfo({ 
              id: user.user_id,
              history: JSON.stringify(arr)  
            })
          } else {
            historyArr.push({ date_game: moment().format('DD/MM/YYYY'),total_coins: board.mine_coins, total_score: board.score })  
            await putHistoryInfo({ 
              id: user.user_id,
              history: JSON.stringify(historyArr)  
            })
          } 
        } 
     
        let userHistoryDays =  user?.history == undefined ? {} :JSON.parse(user?.history); 

        if(typeof(userHistoryDays) == 'string') {
    
          userHistoryDays = [...JSON.parse(userHistoryDays)]
          let nowDay = moment().format('DD/MM/YYYY')
         
          function isBigEnough(value) { 
            return  value.date_game == nowDay;
          }
   
          let resultFilter = userHistoryDays.filter(isBigEnough)
          var sumCountDayCoins = resultFilter.reduce((acc, cur) =>{ return acc + cur.total_coins }, 0); 
          var allCountDaysCoins = userHistoryDays.reduce((acc, cur) => { return acc + cur.total_coins }, 0); 
          var sumCountDayScore = resultFilter.reduce((acc, cur) => { return acc + cur.total_score }, 0); 
          var allCountDaysScore = userHistoryDays.reduce((acc, cur) => { return acc + cur.total_score }, 0); 
  
        } else {
          var sumCountDayCoins = 0; 
          var allCountDaysCoins = 0; 
          var sumCountDayScore = 0; 
          var allCountDaysScore = 0; 
        }
 
        let newuser =  await set_info_user({
          userId: user.user_id,
          energy: Number(user.energy) == 0 ? 0 : JSON.stringify(Number(user.energy) - 1),
          balance_count: JSON.stringify(Number(user.balance_count) + board.mine_coins), 
          date_loss_game: user.date_loss_game == null ? moment().format("YYYY-MM-DD HH:mm") : moment(user.date_loss_game).format("YYYY-MM-DD HH:mm"),
          score: JSON.stringify(Number(user.score) + board.score), 
          bestGame: JSON.stringify({...JSON.parse(user?.bestGame),
             daily: { score: sumCountDayScore + board.score, coins: sumCountDayCoins + board.mine_coins },
             all_time: { score: allCountDaysScore + board.score, coins: allCountDaysCoins + board.mine_coins },
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
 
    useEffect(() => { 

      if(loading) {
        setBoard(new Board({ miningInfo }));
        const fetchData = async () => {  
          await putBoardState({ 
            id: user.user_id,
            boardstate: {}
          }); 
        }
        fetchData()
      
        dispatch(setLoadding(false))
      } 
    },[loading]) 
 
    return (
    <div className="boardViewContainer">
      {
       board.hasLost() && <div className="disabletouch"></div>
      }
      <div className='boardViewTopContainer'>  
        <JoinButton title="Join" img={ telega } onClick={()=>{tg.openTelegramLink(`https://t.me/bcoin2048_RU_channel`)}} />      
        <GetButton title="Invite Buddies"  fill={!false} invite={true} onClick={()=>{tg.openTelegramLink(`https://t.me/share/url?url=${user.partnerLink}&text=Play 2048 to earn Bcoin for free!💸`)}}/>
      </div> 
      <div {...handlers} className="touchContainer"> 
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
