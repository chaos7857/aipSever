const db = require('../db/index');
const bcryptjs = require('bcryptjs');
exports.getUserInfo = (req, res) => {
    // 得把password排除
    const sql = 'select id,username, email, icon from user where id=?'

    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.sm(err)
        if (results.length !== 1) return res.sm('failed')
        let info = {...results[0],icon:results[0].icon.toString()}
        res.send({
            status: 0,
            message: 'get user info successfully',
            data: info
        })
    })
}

exports.updateUserInfo = (req, res) => {
    const sql = `update user set ? where id=?`
    db.query(sql, [req.body, req.auth.id], (err, results) => {
        if (err) return res.sm(err)
        if (results.affectedRows !== 1) return res.sm('failed to update')
        res.send({
            status: 0,
            message: 'update successfully',
            info: results.message
        })
    })
}

exports.updatepwd = (req, res) => {
    let sql = `select * from user where id=?`

    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.sm(err)
        if (results.length !== 1) return res.sm('not found')
        const flag = bcryptjs.compareSync(req.body.oldPwd, results[0].password)
        if (!flag) return res.sm('old is wrong')
        sql = `update user set password=? where id=?`
        db.query(sql, [req.body.newPwd, req.auth.id], (err, results) => {
            if (err) return res.sm(err)
            if (results.affectedRows !== 1) return res.sm('failed to update pwd')
            return res.send({
                status: 0,
                message: 'update successfully',
                info: results.message
            })
        })
    })
}

exports.updateicon = (req, res) => {
    const sql = `update user set icon=? where id=?`
    db.query(sql, [req.body.icon, req.auth.id], (err, results) => {
        if (err) return res.sm(err)
        if (results.affectedRows !== 1) return res.sm('failed to update icon')
        return res.sm('update icon success', 0)
    })
}