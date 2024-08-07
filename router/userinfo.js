const express = require('express');
const router = express.Router()
const userinfo_handler = require('../handler/userinfo');


router.get('/userinfo',userinfo_handler.getUserInfo)
module.exports = router