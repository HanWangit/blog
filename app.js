const express = require('express');
const body = require('body-parser');
const app = express();


app.set('view engine','ejs'); //设置默认引擎模板
app.set('views','./public'); //设置模板默认路径

app.use('/node_modules',express.static('./node_modules')); //托管资源

//body-barter中间件注册
app.use(body.urlencoded({extended: false}))




//导入首页路由
const indexRouter = require('./router/index');
app.use(indexRouter);
//导入用户路由
const userRouter = require('./router/user');
app.use(userRouter);



app.listen(80,()=>{
    console.log('http://127.0.0.1');
})