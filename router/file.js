const express = require('express');
const router = express.Router()
const filehandler = require('../handler/file')
const multer = require('multer');
const path = require('path');
const upload = multer({dest:path.join(__dirname,'../uploads')})
router.post('/',upload.single('file'),filehandler.addfile)
module.exports = router