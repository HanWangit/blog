const express = require('express');
const router = express.Router();
const moment = require('moment');
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog'
})

//实现登录页面跳转
router.get('/login',(req,res)=>{
    res.render('./user/login.ejs');
})
//实现注册页面跳转
router.get('/register',(req,res)=>{
    res.render('./user/register.ejs');
})

//登录业务逻辑
router.post('/login',(req,res)=>{
    //获取用户数据
    const body = req.body;
    //判断数据库中是否存在该 用户
    const sql = 'select * from user where username = ? and password = ?';
    conn.query(sql,[body.username,body.password],(err,result)=>{
        if(err) res.send({status: 500,msg: err.message+'请重试',data:null});
        if(result.length < 1) return res.send({status: 400,msg: '用户名或密码错误,请重试!',data:null});
        res.send({status: 200,msg: '登陆成功',data:result})
    })
})


//注册业务逻辑
router.post('/register',(req,res)=>{
    // console.log(req.body);
    const body = req.body;
    //判断数据是否的完整
    if( body.username.trim().length <= 0 || body.password.trim().length <= 0 || body.nickname.trim().length <= 0)return res.send({status: 400,msg: '注册失败,请填写完整信息',data:null})
    //查重
    const sql1 = 'select count(*) as count from user where username = ?';
    conn.query(sql1,body.username,(err,result)=>{
        if(err) res.send({status: 500,msg: err.message+'请重试',data:null});
        if(result[0].count > 0) return res.send({status: 400,msg: '用户名已存在,请重试!',data:null});

        //往数据库添加用户数据
        //插入时间
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
        const sql2 = 'insert into user set ?';
        conn.query(sql2,body,(err,result)=>{
            if(err) res.send({status: 500,msg: err.message+'请重试',data:null});
            res.send({status: 200,msg: '注册成功',data:null})
        })
    })
})


module.exports = router