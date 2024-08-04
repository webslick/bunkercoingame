const moment = require('moment'); 
module.exports = class AdminDto { 
  id;
  chanels;
  halving;
  count_coin_all; 
  toogle_status_bot; 
  admin_tg_ids;  
  bonus;  
  task_main;  
  tasks;   
  createdAt;    

  constructor(model) {   
    this.id = model?.id; 
    this.chanels = model?.chanels; 
    this.halving = model?.halving; 
    this.count_coin_all = model?.count_coin_all;   
    this.toogle_status_bot = model?.toogle_status_bot; 
    this.admin_tg_ids = model?.admin_tg_ids;   
    this.bonus = model?.bonus;  
    this.task_main = model?.task_main;  
    this.tasks = model?.tasks;   
    this.createdAt = moment(model?.createdAt).format("YYYY-MM-DD HH:mm");     
  } 
}
 