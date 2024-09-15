const moment = require('moment'); 
module.exports = class ProfileDto { 
  user_id; 
  user_name;
  date_loss_game;
  hints;
  energy;
  balance_count;
  score;
  partnerLink;
  partners;
  partners_twolevel; 
  history;
  boardstate;
  privateKey; 
  subKey;
  wait;
  nastavnik; 
  bestGame; 
   
  constructor(model) { 

    this.user_id = model?.user_id;  
    this.user_name = model?.user_name;  
    this.date_loss_game = model?.date_loss_game == null ? null : moment(model?.date_loss_game).format("YYYY/MM/DD HH:mm");  
    this.hints = model?.hints;   
    this.energy = model?.energy;  
    this.balance_count = model?.balance_count;  
    this.score = model?.score;  
    this.partnerLink = model?.partnerLink;  
    this.partners_twolevel = model?.partners_twolevel;   
    this.partners = model?.partners;   
    this.history = model?.history;   
    this.boardstate = model?.boardstate;   
    this.privateKey = model?.privateKey;  
    this.subKey = model?.subKey;  
    this.wait = model?.wait;  
    this.nastavnik = model?.nastavnik;    
    this.bestGame = model?.bestGame;    
  } 
}
 