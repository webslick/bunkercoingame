const { Router } = require('express');
const userController = require('../controllers/user_controller');   
const router = Router() 
  
router.post('/getUserInfo',userController.getUserInfo);  
router.post('/setUserInfo',userController.setUserInfo);  
router.post('/putMiningInfo',userController.putMiningInfo);  
router.post('/putHistoryInfo',userController.putHistoryInfo);  
router.get('/getAppInfo',userController.getAppInfo);  
router.get('/getAllUsers',userController.getAllUsers);  
 
module.exports = router;
