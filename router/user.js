const express = require('express')
const router = express.Router()
const userHandler = require('../handler/user');
const expressJoi = require('@escook/express-joi')
const {
    reg_login_schema
} = require('../schema/user')
//路由
// console.log(reg_login_schema);
router.post('/register', expressJoi(reg_login_schema), userHandler.register)
router.post('/login', expressJoi(reg_login_schema), userHandler.login)
// router.get('/index', userHandler.index)

module.exports = router