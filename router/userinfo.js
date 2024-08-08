const express = require('express');
const router = express.Router()
const userinfo_handler = require('../handler/userinfo');
const {update_schema,updatepwd_schema,updateicon_schema} = require('../schema/user')
const expressJoi = require('@escook/express-joi')

router.get('/userinfo',userinfo_handler.getUserInfo)
router.post('/userinfo',expressJoi(update_schema),userinfo_handler.updateUserInfo)
router.post('/updatepwd',expressJoi(updatepwd_schema),userinfo_handler.updatepwd)
router.post('/updateicon',expressJoi(updateicon_schema),userinfo_handler.updateicon)

module.exports = router