const userService = require('../services/users-service'); 
const config = require('config'); 

class UserController  {
 
  async getUserInfo(req,res,next) {  
    try {    
      const { userId } = req.body;  
      const userData = await userService.getUserInfo(userId); 
      return res.json(userData.user); 
    } catch (e) {
      next(e);
    }
  }
 
  async setUserInfo(req,res,next) { 
    try {     
      const userData = await userService.setUserInfo(req.body); 
      return res.json(userData.user); 
    } catch (e) {
      next(e);
    }
  }
 
  async getAllArrayIds(req,res,next) { 
    try {       
        const userData = await userService.getAllArrayIds(req.body); 
        return res.json(userData.all_users);  
    } catch (e) {
      next(e);
    }
  }
 
  async getAllUsers(req,res,next) { 
    try {      
      const userData = await userService.getAllUsers(); 
      return res.json(userData.all_users); 
    } catch (e) {
      next(e);
    }
  }
 
  async getAppInfo(req,res,next) { 
    try {    
      const appData = await userService.getAppInfo(); 
      return res.json(appData);
    } catch (e) {
      next(e);
    }
  }

  async setPageInfo(req,res,next) { 
    try { 
      const { pageInfo, pageId } = req.body; 
  
      const pageData = await userService.setPageInfo(pageInfo, pageId); 
      return res.json(pageData);
    } catch (e) {
      next(e);
    }
  }

  async createPage(req,res,next) { 
    try { 
      const {  
        birthdate, 
        birthlocation, 
        career, 
        children, 
        deathdate, 
        deathlocation, 
        education, 
        epity, 
        initialDeath, 
        nationality, 
        secondhalf, 
        userId 
       } = req.body;  
   
      const pageData = await userService.createPage({ 
        birthdate, 
        birthlocation, 
        career, 
        children, 
        deathdate, 
        deathlocation, 
        education, 
        epity, 
        initialDeath, 
        nationality, 
        secondhalf, 
      }, userId); 

      return res.json(pageData);
    } catch (e) { 
      next(e);
    }
  }

 
  async getUserData(req,res,next) {
    try {
      const { body } = req.body;
      if(body !== undefined) {
        const user = await userService.getUserData(body);
        res.json(user);
      }
    } catch (e) {
      next(e);
    }
  }
 
  async editPage(req, res, next) { 
    try {
      const file = await userService.editPage(req,res,next);
     return res.json(file);
    } catch (e) {
      next(e);
    }
  } 
  
  async putMiningInfo(req, res, next) {
    try {
      const { new_halving_earn, new_halving_coin } = req.body  
      const info = await userService.putMiningInfo({ 
        new_halving_earn,
        new_halving_coin
      });
     return res.json(info);
    } catch (e) {
      next(e);
    }
  } 
  
  async putTotalCoin(req, res, next) {
    try {
      const { total_coin_mine } = req.body  
      const info = await userService.putTotalCoin({ 
        total_coin_mine
      });
     return res.json(info);
    } catch (e) {
      next(e);
    }
  } 
  
  async createUser(req, res, next) {
  
    try {      
      const user = await userService.createUser(req.body);  
     return res.json(user);
    } catch (e) {
      next(e);
    }
  } 
  
  async setPartners(req, res, next) {
    try {  
      const partInfo = await userService.setPartners(req.body);
     return res.json(partInfo.user);
    } catch (e) {
      next(e);
    }
  } 
  
  async putBoardState(req, res, next) {
    try {   
      const info = await userService.putBoardState(req.body);
     return res.json(info.user);
    } catch (e) {
      next(e);
    }
  } 
  
  async putHistoryInfo(req, res, next) {
    try {   
      const info = await userService.putHistoryInfo(req.body);
     return res.json(info.user);
    } catch (e) {
      next(e);
    }
  } 
  
  async getPageInfo(req, res, next) {
    try {
      const { pageId } = req.body 
      const info = await userService.getPageInfo(pageId);
     return res.json(info);
    } catch (e) {
      next(e);
    }
  } 
  
  async deletePage(req, res, next) {
    try {
      const { pageId } = req.body 
      const info = await userService.deletePage(pageId);
     return res.json(info);
    } catch (e) {
      next(e);
    }
  } 
  
  async sendConsult(req, res, next) {
    try {
      const { body } = req.body
      const { byer_consult_initial,byer_consult_tel, coment_consult } = body; 
 
      await userService.sendConsult(res, byer_consult_initial, byer_consult_tel, coment_consult );
    //  return res.json(info);
    } catch (e) {
      next(e);
    }
  } 


  async getRandomNumbers(req,res,next) { 
    try { 
      const {  
        min,
        max,
        count,
        norepeat, 
        win,
        sort
       } = req.body;  
   
      const numbersData = await userService.getRandomNumbers({ 
        min,
        max,
        count,
        norepeat, 
        win,
        sort
      }); 

      return res.json(numbersData);
    } catch (e) { 
      next(e);
    }
  }




  
}

module.exports = new UserController();
