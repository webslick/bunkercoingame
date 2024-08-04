const moment = require('moment'); 
module.exports = class UserDto {
  id;  
  createdAt; 

  constructor(model) {   
    this.id = model?.id;  
    this.createdAt = moment(model?.createdAt).format("YYYY-MM-DD HH:mm");  
  }
 
}
 