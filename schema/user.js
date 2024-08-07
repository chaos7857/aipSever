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
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}