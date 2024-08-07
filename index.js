const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
const userinfoRouter = require('./router/userinfo')
const joi = require('joi')
const expressJwt = require('express-jwt')
const config = require('./config');
// 全局中间件
app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use((req, res, next) => {
    res.sm = function (message, status = 1) {
        res.send({
            status,
            message: message instanceof Error ? message.message : message
        })
    }
    next()
})
app.use(expressJwt.expressjwt({
    secret: config.jwtSecret,
    algorithms: ['HS256']
}).unless({
    path: [/^\/api\/(register)?(login)?$/]
}))

// app.use(express.static('./public'))
// 添加路由
app.use('/api', userRouter)
app.use('/api/user', userinfoRouter)

// 错误中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError)  return res.sm(err)
    if (err instanceof expressJwt.UnauthorizedError) return res.sm(err)
    res.sm(err)
})
// 开启服务
app.listen(88, () => {
    console.log(`sever listen at http://127.0.0.1:88`);
})