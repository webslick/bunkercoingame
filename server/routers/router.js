const { Router } = require('express');
const userController = require('../controllers/user_controller');   
const router = Router() 
  
router.post('/getUserInfo',userController.getUserInfo);  
router.post('/createUser',userController.createUser);  
router.post('/setUserInfo',userController.setUserInfo);  
router.post('/setPartners',userController.setPartners);  
router.post('/putMiningInfo',userController.putMiningInfo);  
router.post('/putTotalCoin',userController.putTotalCoin);  
router.post('/putBoardState',userController.putBoardState);  
router.post('/putHistoryInfo',userController.putHistoryInfo);  
router.post('/getAllArrayIds',userController.getAllArrayIds);  
router.get('/getAppInfo',userController.getAppInfo);  
router.get('/getAllUsers',userController.getAllUsers);  
 
module.exports = router;
