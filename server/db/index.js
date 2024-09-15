const { 
  Admin_users, 
  Profiles,
  Users,  
 } = require('../db/models'); 
  
const ApiErr = require('../exeptions/api-error'); 
 
const db = require('./models/index');

const serviceFunction = require("../service_functions")
class DB {
 
  constructor(name) { 
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
            wait,
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
              wait,
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
 
    const profileAttributes = ["id","user_id","bestGame", "user_name", "date_loss_game", "hints", "energy", "wait", "balance_count","score","partners", "partnerLink","partners_twolevel","history","boardstate","privateKey","subKey","nastavnik"]
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
 
 
}

module.exports = new DB();