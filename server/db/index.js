const { 
  Admin_users, 
  Profiles,
  Users,  
 } = require('../db/models'); 
  
const ApiErr = require('../exeptions/api-error'); 
const moment = require('moment');
const db = require('./models/index');

const serviceFunction = require("../service_functions")
 
class DB {
 
  constructor(name) {
    this.GLOBAL_UNIQUE_SESSIONS = [];
    this.LOCAL_USER_SESSIONS = [];
  }

  async addInTables(table, obj) { 

      switch (table) {
        case 'users':  
   
          const { 
            user_id,
            user_name,
            date_loss_game,
            hints,
            energy, 
            balance_count, 
            score, 
            partners, 
            partners_twolevel, 
            history, 
            boardstate,
            nastavnik, 
            privateKey, 
            partnerLink,
            subKey, 
            bestGame, 
            first_name, 
            last_name,
            date_connection_channel,  
          } = obj;   
 
          const user = await Users.create({ 
            Profiles: {
              user_id,
              user_name,
              date_loss_game,
              hints,
              energy, 
              balance_count, 
              score, 
              boardstate,
              partners, 
              partnerLink,
              partners_twolevel, 
              history, 
              nastavnik, 
              privateKey, 
              bestGame, 
              subKey,  
              first_name, 
              last_name,
              date_connection_channel,  
            }  
          },{
            include: [  
              {
                model: Profiles,
                as: 'Profiles', 
              }, 
            ], 
          }); 
   
          if (!user) {
            throw ApiErr.BadRequest("Не получилось создать пользователя User add") 
          }
     
          return user; 
        
        case 'admin':   
          const { 
            chanels,
            halving_earn,halving_count,total_coin_mine,
            count_coin_all, 
            toogle_status_bot, 
            admin_tg_ids,  
            bonus,  
            task_main,  
            tasks,   
          } = obj;   
 
          const admin = await Admin_users.create({ 
            chanels,
            halving_earn,halving_count,total_coin_mine,
            count_coin_all, 
            toogle_status_bot, 
            admin_tg_ids,  
            bonus,  
            task_main,  
            tasks,    
          });  
      
          if (!admin) {
            throw ApiErr.BadRequest("Не получилось создать администратора User add") 
          }
     
          return admin; 
        
      }
  }
 
  async searchInTables(table, item) { 
 
    const profileAttributes = ["id","user_id","bestGame", "user_name", "date_loss_game", "hints", "energy", "balance_count","score","partners", "partnerLink","partners_twolevel","history","boardstate","privateKey","subKey","nastavnik"]
    switch (table) {
      case 'user_admin': 
 
      const user_admin = await Admin_users.findOne({ 
          where: item , 
          attributes: [ "id","chanels", "halving_earn","halving_count","total_coin_mine", "count_coin_all", "toogle_status_bot", "admin_tg_ids", "bonus","task_main","tasks" ],   
      }) 
    
      return user_admin;
       
      case 'user_id':  
      const users_by_id = await Profiles.findOne({
       where: { user_id: item },  
       attributes: profileAttributes,  
     })  
 
     return users_by_id;
       
      case 'users_aray_id':  
  
      const users_aray_id = await Profiles.findAll({
       where: { user_id: item },  
       attributes: profileAttributes,  
     })  
 
     return users_aray_id;
 
     case 'all_users':  
     const profile_by_id = await Profiles.findAll();
       
     return profile_by_id;
 
    } 
  }
  
  async removeInTables(model) {
    const mod = await model.destroy();
    return mod;
  }

  async updateModelTables(model,obj) {   
    const mod = await model.update(obj);
    return mod;
  }

  async resetIncrementTables() {
    await db.sequelize.query("ALTER TABLE Users AUTO_INCREMENT = 0;");
    await db.sequelize.query("ALTER TABLE Admin_users AUTO_INCREMENT = 0;");  
  }
 
  initionalUserLocalSession(info) { // инициализация локальной сессии
    const { date, from: { id, first_name, last_name, username } } = info;
    const user = {
      id,
      user_name: username,
      first_name,
      last_name,
      date_connection: date,
      info_user: { 
        active_page:'main',
        text_request: '/star',
        date_last_request: date,
        notification_request: [{}]
      },
    }
    isNotMatch(LOCAL_USER_SESSIONS,id) ? LOCAL_USER_SESSIONS.push(user) : false;
  }
  
  initionalUserGlobalSession(info) { // Инициализация глобальной сессии
    const { date, from: { id, first_name, last_name, username} } = info;
    const user = {
      id,
      user_name: username,
      first_name,
      last_name,
      date_connection: date,
      info_user: { 
        active_page:'main',
        text_request: '/start',
        date_last_request: date,
        notification_request: [{}]
      },
    }
    isNotMatch(GLOBAL_UNIQUE_SESSIONS,id) ? GLOBAL_UNIQUE_SESSIONS.push(user) : false;
  }
  
  identificationSessionUser (userId) { // Проверяет уникальность пользователя в сесиях
    for (let count = 0; count < LOCAL_USER_SESSIONS.length; count++) {
      if(LOCAL_USER_SESSIONS[count].id === userId) return false; 
    }
    for (let count = 0; count < GLOBAL_UNIQUE_SESSIONS.length; count++) {
      if(GLOBAL_UNIQUE_SESSIONS[count].id === userId) return false; 
    }
    return true;
  }
  
  getUserSession (userId) { // Возвращает юзера в локальной сессии
    for (let count = 0; count < LOCAL_USER_SESSIONS.length; count++) {
      if(LOCAL_USER_SESSIONS[count].id === userId) return LOCAL_USER_SESSIONS[count]; 
    }
    return null;
  }
  
  putUserSession (userId,dody) { // Меняет данные юзера в локальной сессии
    for (let count = 0; count < LOCAL_USER_SESSIONS.length; count++) {
      if(LOCAL_USER_SESSIONS[count].id === userId) {
        for (var item in dody) {
          for (var key in LOCAL_USER_SESSIONS[count]) {
            if(key === item) {
              if(typeof(LOCAL_USER_SESSIONS[count][key]) === 'object') {
                for(var subkey in LOCAL_USER_SESSIONS[count][key]) {
                  if(typeof(dody[key][subkey]) == 'object') {
                    LOCAL_USER_SESSIONS[count][item][subkey] = dody[key][subkey]
                  } else {
                    LOCAL_USER_SESSIONS[count][item][subkey] = (dody[key][subkey] === undefined )? LOCAL_USER_SESSIONS[count][item][subkey] : dody[key][subkey]
                  }
                }
              } else {
                LOCAL_USER_SESSIONS[count][key] = dody[key];
              }
            } 
          }
        }
        console.log(LOCAL_USER_SESSIONS[count])
      } 
    }
  }
  
  garbageSessionsUser () { // Удаляет муорные сессии больше часа
    LOCAL_USER_SESSIONS.map((user,position) => {
      if((convertSeconds(moment().diff(moment(user.info_user.date_last_request * 1000))).hours) > 0) {
        LOCAL_USER_SESSIONS.splice(position, 1);
      }
    });
  }
  
  isNotMatch(arr,id) { //
    let push = true;
    arr.forEach(element => {
      if(element.id === id) { push = false; }
    });
    return push;
  }
  
  async getAdminItems() { // получить данные администратора

    let result = {};
  
    try {
     
      const condidate = await this.searchInTables('user_admin',{ id: 1 });
 
      let result = {}
 
      if(!condidate) {
        throw ApiErr.BadRequest(`Пользователь не найден`);
      } else {
     
        result = {  
          ...serviceFunction.removeEmpty(condidate, 'Admin_users'),   
        };  
 
        return { ...result, condidate }
      }
   
    } catch(error) {
      console.log(error)
      throw ApiErr.BadRequest(`Пользователь не найден необходимо пройти регистрацию: `);
    }
  }
  
  async getUsers() { //
    let array_error = [];
    let object_result = {
      users: [],
      errors: null
    };
    let error_item = ['Users'];
  
    // const NowBDformat = moment(moment().add(7, 'hours').format("YYYY-MM-DD HH:mm"));
  
    try {
      let results = await Promise.all([
        Users.findAll(),
      ]);
  
      results.map((element_promise,count) => {
  
        if (!element_promise || element_promise === null || element_promise === "" || element_promise.length === 0) {
          array_error.push(`Not elem in table for: ${error_item[count]}`);
        }
  
        if (Array.isArray(element_promise)) {  
          element_promise.map((elem) => {
            object_result.users.push({
              id: elem.dataValues.user_id,
              first_name: elem.dataValues.first_name,
              user_name: elem.dataValues.user_name,
              last_name: elem.dataValues.last_name,
              date_conection: elem.dataValues.date_conection,
              notification_request: elem.dataValues.notification_request,
            })
          })
        } else {
          // if (item !== null && item.dataValues !== undefined && item.dataValues.login !== undefined) {
          //   objResult.login = item.dataValues.login,
          //   objResult.password = item.dataValues.password,
          //   objResult.email_admin = item.dataValues.email
          // }
    
          // if (item !== null && item.dataValues !== undefined && item.dataValues.toogle_total_temp !== undefined) {
          //   objResult.toogle_total_temp = item.dataValues.toogle_total_temp,
          //   objResult.total_temp_min = item.dataValues.total_temp_min,
          //   objResult.total_temp_max = item.dataValues.total_temp_max,
          //   objResult.site_status_has_block = item.dataValues.site_status_has_block,
          //   objResult.mode_auto = item.dataValues.mode_auto,
          //   objResult.status_mode = item.dataValues.status_mode
          // }
        }
      });
  
      object_result.errors = array_error;
  
      return object_result;
  
    } catch(error) {
      if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
        array_error.push(`Произошла ошибка: ${error.original.sqlMessage}`);
        object_result.errors = array_error;
        return object_result;
      }
      array_error.push(`Произошла ошибка: ${error.msg}`);
      object_result.errors = array_error;
      return object_result;
    }
  }
  
  async getUser(user_id) { //
    let array_error = [];
    let object_result = {
      user: {},
      errors: null
    };
  
    let error_item = ['Users'];
  
    try {
      let results = await Promise.all([
        Users.findOne({where: { user_id }}),
      ]);
  
      results.map((element_promise,count) => {
        if (!element_promise || element_promise === null || element_promise === "" || element_promise.length === 0 || element_promise === undefined) {
          array_error.push(`Not elem in table for: ${error_item[count]}`);
        }
        
        if (element_promise !== null && element_promise.dataValues !== undefined && element_promise.dataValues.id !== undefined) {
          object_result.user = {
            id: element_promise.dataValues.user_id,
            first_name: element_promise.dataValues.first_name,
            user_name: element_promise.dataValues.user_name,
            last_name: element_promise.dataValues.last_name,
            date_conection: element_promise.dataValues.date_conection,
            info_user: element_promise.dataValues.info_user
          }
        }
      });
  
      object_result.errors = array_error;
      return object_result;
  
    } catch(error) {
      if(error.original !== undefined && error.original.code === 'ER_ACCESS_DENIED_ERROR') {
        array_error.push(`Произошла ошибка: ${error.original.sqlMessage}`);
        object_result.errors = array_error;
        return object_result;
      }
      error.msg ? array_error.push(`Произошла ошибка: ${error.msg}`) : array_error.push(`Произошла ошибка: ${error}`);
      object_result.errors = array_error;
      return object_result;
    }
  }
  
  async putUser(user_id,body) { //
    Users.update(body, {
      where: {
        id:user_id,
      }
    })
    .then(result => {
      if (!result || result === null || result === "" || result[0] === 0) return console.log({msg: "Not user in table"})
       console.log("Update base succes")
    })
    .catch(error => {
      console.log(error)
    }) 
  }
  
  async putAdmin(body) {
    Admin_users.update(body, {
      where: {
        id: 1,
      }
    })
    .then(result => {
      if (!result || result === null || result === "" || result[0] === 0) return console.log({msg: "Not RESULT"})
       console.log("Update base succes")
    })
    .catch(error => {
      console.log(error.original)
    }) 
  }
  
  async createUser(obj) { //
    if(obj.id !== undefined) {
      Users.create({
        user_id: JSON.stringify(obj.id),
        user_name: obj.user_name !== undefined ? JSON.stringify(obj.user_name ): '',
        first_name: obj.first_name !== undefined ? JSON.stringify(obj.first_name): '',
        last_name: obj.last_name !== undefined ? JSON.stringify(obj.last_name ): '',
        date_conection: obj.date_conection !== undefined ? obj.date_conection : new Date(),
        info_user: JSON.stringify({
          active_page: obj.info_user.active_page !== undefined ? obj.info_user.active_page : '',
          text_request: obj.info_user.text_request !== undefined ? obj.info_user.text_request : '',
          date_last_request: obj.info_user.date_last_request !== undefined ? obj.info_user.date_last_request : new Date(),
          notification_request: obj.info_user.notification_request !== undefined ? obj.info_user.notification_request : JSON.stringify([{}])
        })
      })
      .then(result => {
        if (!result || result === null || result === "" || result[0] === 0) return console.log({msg: "Not user in table"})
         console.log("Create user in base succes")
      })
      .catch(error => {
        console.log(error.original.sqlMessage)
      }) 
    } else {
      console.log("NO CREATE USER.PLEASE ENTER ID !!!")
    }
  }
  
  async isUniqmUser(id) { //
    const { user, errors } = await getUser(id);
    console.log(user)
    if(errors.length > 0) {
      console.log(errors[0]);
      return true;
    }
    return false;
  }
  
  async generateUserNumber(id) { // генерация номеров выйгрыша

    let admin = await this.searchInTables('user_admin',{ id: 1 }); 

    let result = {  
      ...serviceFunction.removeEmpty(admin, 'Admin_users'),   
    };  
 
    let result_add = {};

    result_add = {  
      ...serviceFunction.removeEmpty(await this.updateModelTables(admin,{ id: 1, raffle_number: Number(result.raffle_number) + 1 }), 'Admin_users'),   
    }; 
    
    return result_add.raffle_number; 
    
  }
   


}

module.exports = new DB();