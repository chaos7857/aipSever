const mysql = require('mysql')
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'password'
})
db.on('connection',(conn)=>{
    console.log('new connection', conn.threadId);
    
})
db.on('release',(conn)=>{
    console.log('release', conn.threadId);
    
})
db.on('acquire', function (conn) {
    console.log('获取连接', conn.threadId);
});
module.exports = db