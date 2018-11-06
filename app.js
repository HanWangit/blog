const express = require('express');
const body = require('body-parser');
const fs = require('fs');
const path = require('path');
//导入express-session
const session = require('express-session');


const app = express();

app.set('view engine','ejs'); //设置默认引擎模板
app.set('views','./public'); //设置模板默认路径

app.use('/node_modules',express.static('./node_modules')); //托管资源

//body-barter中间件注册
app.use(body.urlencoded({extended: false}))
//express-session中间件注册
app.use(session({
    secret: 'keyword',
    resave: false,
    saveUninitialized: false
}))


//自动导入router中的路由
fs.readdir(path.join(__dirname,'./router'),(err,filename)=>{
    if(err) return console.log('读取路又失败');
    //循环遍历所有路由文件名
    filename.forEach(fname =>{
        const router = require(path.join(__dirname,'./router',fname));
        app.use(router);
    })
})




app.listen(80,()=>{
    console.log('http://127.0.0.1');
})