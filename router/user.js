const express = require('express');
const router = express.Router();
const controllerUser = require('../controller/c_user.js');


//实现登录页面跳转
router.get('/login',controllerUser.handleLoginGet)
//实现注册页面跳转
router.get('/register',controllerUser.handleRegisterGet);

//登录业务逻辑
router.post('/login',controllerUser.handleLoginPost);

//注册业务逻辑
router.post('/register',controllerUser.handleRegisterPost);
//注销
router.get('/logout',controllerUser.handleLogoutGet);

module.exports = router