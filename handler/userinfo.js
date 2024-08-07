const db = require('../db/index');
exports.getUserInfo = (req, res) => {
    // 得把password排除
    const sql = 'select id,username, email, icon from user where id=?'

    db.query(sql,req.auth.id,(err,results)=>{
        if(err)return res.sm(err)
        if(results.length!==1) return res.sm('failed')
        res.send({
            status:0,
            message:'get user info successfully',
            data:results[0]
        })
    })
}