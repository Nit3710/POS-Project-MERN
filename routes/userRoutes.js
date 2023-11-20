const express = require('express');
const { loginController, registerController } = require('../controller/userController');
const router = express.Router();
//routes using post method
router.post('/login', loginController);
//method using post 
router.post('/register', registerController);

module.exports = router;