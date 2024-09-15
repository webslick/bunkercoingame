 
const uuid = require('uuid'); 
const DB = require('../db/index'); 
const UserDto = require('../dtos/user-dto'); 
const ApiErr = require('../exeptions/api-error'); 
const serviceFunction = require("../service_functions") 
const moment = require('moment') 
 
const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
 class UserService {
 
  async putHistoryInfo(historyInfo) {
   
    try {  
   
      const user = await DB.searchInTables('user_id', historyInfo.id ); 
      let result = {}
 
      if(!user) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
       
        var newUserInfo = await DB.updateModelTables(user, { history: JSON.stringify(historyInfo.history) }); 
       
        result = {  
          ...serviceFunction.removeEmpty(newUserInfo, 'Profiles'),    
        };  
    
        return { user: result } 
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    } 
  }
 
  async putBoardState(boardstateInfo) {
   
    try {  
   
      const user = await DB.searchInTables('user_id', boardstateInfo.id ); 
      let result = {}
 
      if(!user) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
       
        let stateBoard = {}
        if(boardstateInfo.wait) {
          stateBoard = { boardstate: JSON.stringify(boardstateInfo.boardstate), wait: boardstateInfo.wait} 
        } else {
          stateBoard = { boardstate: JSON.stringify(boardstateInfo.boardstate) } 
        }
        var newUserInfo = await DB.updateModelTables(user, stateBoard ); 
       
        result = {  
          ...serviceFunction.removeEmpty(newUserInfo, 'Profiles'),    
        };  
    
        return { user: result } 
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    } 
  }
 
  async createUser({ id, first_name, last_name }) {
 
    try { 
    
      let result = {}

      const soul = uuid.v4(); 
      const privateKey = soul.split('-')[0].substring(0, 4)
      const subKey = soul.split('-')[soul.split('-').length - 1].substring(0, 4);  
      let add_user = await DB.addInTables('users',{
        user_id: id,
        user_name: first_name != null ? first_name :
        last_name != null ? last_name : 'No name',
        date_loss_game: null,
        hints:JSON.stringify({ 
          stepback: 0, 
        }),
        energy: JSON.stringify(4), 
        balance_count: JSON.stringify(0), 
        score: JSON.stringify(0), 
        partners: JSON.stringify([]), 
        partnerLink: `https://t.me/BitBunker_bot/bitbunkercoin?startapp=ref_${privateKey}_${id}_${subKey}`,
        partners_twolevel: JSON.stringify([]), 
        history: JSON.stringify([]), 
        boardstate: JSON.stringify({}), 
        nastavnik: JSON.stringify([]), 
        privateKey, 
        subKey, 
        bestGame: JSON.stringify({ 
          daily_place: 0,
          all_place: 0,
          daily: {
            score: 0, 
            coins: 0 
          },
          all_time: {
            score: 0, 
            coins: 0 
          } 
        }), 
        wait: false,
        first_name, 
        last_name,
        date_connection_channel: moment().format("YYYY-MM-DD HH:mm"),  
      });
  
      result = {  
        ...serviceFunction.removeEmpty(serviceFunction.getObjkey(add_user,'Profiles',false), 'Profiles'),   
      }; 

      return result  

    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    } 


  }
 
  async setUserInfo(user) {
   
    try { 
      const {
        userId,
        energy,
        balance_count,
        date_loss_game,
        score,
        history,
        boardstate,
        bestGame,
        wait,
      } = user
 
      const userg = await DB.searchInTables('user_id', userId ); 
 
      let result = {}
 
      if(!userg) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else { 
        var newUserInfo = await DB.updateModelTables(userg, { 
          energy,
          balance_count,
          date_loss_game,
          score,
          history,
          wait,
          boardstate,
          bestGame,
        }); 
      
        result = {  
          ...serviceFunction.removeEmpty(newUserInfo, 'Profiles'),    
        };  
         
        return { user: result }  

      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    } 
  }
 
  async putMiningInfo(miningInfo) {
   
    try { 
      const {
        new_halving_earn,
        new_halving_coin
      } = miningInfo
 
      const condidate = await DB.searchInTables('user_admin',{ id: 1 });
     
      let result = {}
 
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
        var newInfoMine = await DB.updateModelTables(condidate, { 
          halving_earn: new_halving_earn,
          halving_count: new_halving_coin 
        }); 
      
        result = {  
          ...serviceFunction.removeEmpty(newInfoMine, 'Admin_users'),   
        };  
 
        return { 
          chanels: result.chanels,
          halving_count: result.halving_count,
          halving_earn: result.halving_earn,
          count_coin_all: result.count_coin_all,
          total_coin_mine: result.total_coin_mine,
          bonus: result.bonus,
          task_main: result.task_main,
          tasks: result.tasks,
        }
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    } 
  }
 
  async putTotalCoin(coinInfo) {
   
    try { 
      const {
        total_coin_mine
      } = coinInfo
 
      const condidate = await DB.searchInTables('user_admin',{ id: 1 });
     
      let result = {}
 
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
        var newInfoMine = await DB.updateModelTables(condidate, { 
          total_coin_mine, 
        }); 
      
        result = {  
          ...serviceFunction.removeEmpty(newInfoMine, 'Admin_users'),   
        };  
 
        return { 
          chanels: result.chanels,
          halving_count: result.halving_count,
          halving_earn: result.halving_earn,
          count_coin_all: result.count_coin_all,
          total_coin_mine: result.total_coin_mine,
          bonus: result.bonus,
          task_main: result.task_main,
          tasks: result.tasks,
        }
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    } 
  }
 
  async setPartners({ bossId, partners, partners_twolevel }) {
    
    try {  
 
        const userBoss = await DB.searchInTables('user_id', bossId ); 
   
        var result = {}
   
        if(!userBoss) {
          throw ApiErr.BadRequest(`Пользователь не найден`);
        } else { 
 
          result = {  
            ...serviceFunction.removeEmpty(userBoss, 'Profiles'),    
          }; 
 

          let newPartnerArr = JSON.parse(result.partners); 
          newPartnerArr.push(JSON.parse(partners))

          let unicNewPartnerArr = newPartnerArr.filter((value, index) => {
            const _value = JSON.stringify(value);
 
            return index === newPartnerArr.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
          });
 
          var newUserInfo = await DB.updateModelTables(userBoss, { 
            partners: JSON.stringify([...unicNewPartnerArr]),
            partners_twolevel, 
          }); 
 

          const userPartner = await DB.searchInTables('user_id', JSON.parse(partners).id ); 

          result = {  
            ...serviceFunction.removeEmpty(userPartner, 'Profiles'),    
          }; 

          let newNastavnikArr = JSON.parse(result.nastavnik)
          newNastavnikArr.push({ id: bossId })

          let uniqNewNastavnikArr = newNastavnikArr.filter((value, index) => {
            const _value = JSON.stringify(value); 
            return index === newNastavnikArr.findIndex(obj => {
              return JSON.stringify(obj) === _value;
            });
          });

          var newUserPartner = await DB.updateModelTables(userPartner, { 
            nastavnik: JSON.stringify([...uniqNewNastavnikArr]), 
          }); 
 
          result = {  
            ...serviceFunction.removeEmpty(newUserPartner, 'Profiles'),    
          }; 
   
          return { user: result } 
        } 
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден `);
    } 
  }
 
  async decMoney(email, sum) {
    try { 
      const condidate = await DB.searchInTables('users',{ email }); 
      if(condidate) {
        const userDto = new UserDto(condidate);   
        const newDTO = await DB.updateModelTables(condidate,{ balancePartner: Number(userDto.balancePartner) - Number(sum) }); 
        const newUserDto = new UserDto(newDTO); 
        return { 
          user: newUserDto
        }
      } else { 
        throw ApiErr.BadRequest(`Пользователь не найден`);
      }
    } catch(e) {
      throw ApiErr.BadRequest(e.message)
    } 
  }
 
  async getUserInfo(userId) {  
    try { 
      const user = await DB.searchInTables('user_id', userId );  
      let result = {} 
      if(!user) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
        result = {  
          ...serviceFunction.removeEmpty(user, 'Profiles'),    
        };   
        return { user: result }  
      } 
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    }  
  }
 
  async getAllArrayIds(arrayIds) {  
    let usersArr = []
    const all_users = await DB.searchInTables('users_aray_id',arrayIds ); 
   
    all_users.map((item) => {
      usersArr.push({
        ...serviceFunction.removeEmpty(item, 'Profiles'),
      })
    })
 
    return { all_users: usersArr } 
  }
 
  async getAllUsers() { 
  
    let usersArr = []
    const all_users = await DB.searchInTables('all_users' ); 
    
    all_users.map((item) => {
      usersArr.push({
        ...serviceFunction.removeEmpty(item, 'Profiles'),
      })
    })
 
    return { all_users: usersArr } 
  }
 
  async getAppInfo() { 
 
    try {
     
      const condidate = await DB.searchInTables('user_admin',{ id: 1 });
 
      let result = {}
 
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
     
        result = {  
          ...serviceFunction.removeEmpty(condidate, 'Admin_users'),   
        };  
 
        return { 
          chanels: result.chanels,
          halving_count: result.halving_count,
          halving_earn: result.halving_earn,
          count_coin_all: result.count_coin_all,
          total_coin_mine: result.total_coin_mine,
          bonus: result.bonus,
          task_main: result.task_main,
          tasks: result.tasks,
        }
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    }
    
  }
 
}

module.exports = new UserService();
