const { Router } = require('express');
const userController = require('../controllers/user_controller');   
const router = Router() 
  
router.get('/getUserInfo',userController.getUserInfo);  
router.get('/getAppInfo',userController.getAppInfo);  
 
module.exports = router;
