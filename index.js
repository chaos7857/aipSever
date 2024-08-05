const express = require('express')
const app = express()
const cors = require('cors')
const userRouter = require('./router/user')
// 全局中间件
app.use(cors())
app.use(express.urlencoded({extended:false}))
// app.use(express.static('./public'))
// 添加路由
app.use('/api',userRouter)

// 错误中间件
app.use((err,req,res,next)=>{

})
// 开启服务
app.listen(88, () => {
    console.log(`sever listen at http://127.0.0.1:88`);
})