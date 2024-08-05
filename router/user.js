const express = require('express')
const router = express.Router()
const userHandler = require('../handler/user');
//路由
router.post('/register', userHandler.register)
router.post('/login', userHandler.login)
// router.get('/index', userHandler.index)

module.exports = router