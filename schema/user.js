const joi = require('joi');
/* 
string()
alphanum() === \w
min(length)
max(length)
required()
pattern(re)
*/
const username = joi.string().alphanum().min(1).max(15).required()
const password = joi.string().required().pattern(/^[\S]{6,12}$/)
const email = joi.string().email().required()
// dataUri指的是如下类型的
// data:image/png;base64,VE9PTUFOWVNFQ1JFVFM...
const icon = joi.string().dataUri().required()
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}
exports.update_schema = {
    body: {
        username,
        email
    }
}
exports.updatepwd_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

exports.updateicon_schema = {
    body: {
        icon
    }
}