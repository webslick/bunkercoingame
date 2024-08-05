const moment = require('moment'); 
module.exports = class AdminDto { 
  id;
  chanels; 
  count_coin_all; 
  toogle_status_bot; 
  admin_tg_ids;  
  bonus;  
  task_main;    
  halving_earn;
  halving_count; 
  total_coin_mine; 
  tasks;   
  createdAt;    

  constructor(model) {   
    this.id = model?.id; 
    this.chanels = model?.chanels; 
    this.halving_earn = model?.halving_earn; 
    this.halving_count = model?.halving_count; 
    this.total_coin_mine = model?.total_coin_mine;   
    this.count_coin_all = model?.count_coin_all;   
    this.toogle_status_bot = model?.toogle_status_bot; 
    this.admin_tg_ids = model?.admin_tg_ids;   
    this.bonus = model?.bonus;  
    this.task_main = model?.task_main;  
    this.tasks = model?.tasks;   
    this.createdAt = moment(model?.createdAt).format("YYYY-MM-DD HH:mm");     
  } 
}
 