const db = require('../db/index');
const bcryptjs = require('bcryptjs');

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
                console.log(err.message);
                
                return res.send({
                    status: 1,
                    message: err.message
                })
            }

            if (results.affectedRows !== 1) {
                console.log('register failed');
                
                return res.send({
                    status: 1,
                    message: 'register failed'
                })
            }
            console.log('register successfully');
            

            res.send({
                status: 0,
                message: 'register successfully'
            })
        })
    })
}

exports.login = (req, res) => {
    res.send('login')
}