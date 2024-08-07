const db = require('../db/index');
const bcryptjs = require('bcryptjs');
const {
    use
} = require('../router/user');
const jwt = require('jsonwebtoken');
const config = require('../config')

exports.register = (req, res) => {
    const userinfo = req.body
    console.log(userinfo);

    if (!userinfo.username || !userinfo.password) {
        return res.send({
            status: 1,
            message: 'cannot be null'
        })
    }

    let sql = 'select * from user where username=?'
    db.query(sql, [userinfo.username], (err, results) => {
        if (err) {
            console.log(err.message);

            return res.send({
                status: 1,
                message: err.message
            })
        }
        if (results.length > 0) {
            console.log('username existed');

            return res.send({
                status: 1,
                message: 'username existed'
            })
        }

        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
        console.log(userinfo);

        sql = 'insert into user set ?'
        db.query(sql, {
            username: userinfo.username,
            password: userinfo.password
        }, (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    message: err.message
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    message: 'register failed'
                })
            }
            res.send({
                status: 0,
                message: 'register successfully'
            })
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    console.log('login', userinfo);

    const sql = 'select * from user where username=?'
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.sm(err)
        if (results.length !== 1) return res.sm('failed to loin')
        const flag = bcryptjs.compareSync(userinfo.password, results[0].password)
        if (!flag) {
            return res.sm('not this password')
        }
        const user = {
            ...results[0],
            password: '',
            icon: ''
        }
        const tokenStr = jwt.sign(user, config.jwtSecret, {
            expiresIn: '1h'
        })
        res.send({
            status: 0,
            message: 'login successfully',
            token: `Bearer ${tokenStr}`
        })
        // res.sm('login successfully', 0)
    })
}