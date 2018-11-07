const moment = require('moment');
const conn = require('../db/db.js');

module.exports = {
    handleLoginGet:(req,res)=>{
        res.render('./user/login.ejs');
    },
    handleRegisterGet:(req,res)=>{
        res.render('./user/register.ejs');
    },
    handleLoginPost:(req,res)=>{
        //获取用户数据
        const body = req.body;
        //判断数据库中是否存在该 用户
        const sql = 'select * from user where username = ? and password = ?';
        conn.query(sql,[body.username,body.password],(err,result)=>{
            if(err) res.send({status: 500,msg: err.message+'请重试',data:null});
            if(result.length < 1) return res.send({status: 400,msg: '用户名或密码错误,请重试!',data:null});

            //把用户信息挂载在session上
            req.session.user = result[0];
            //设置记录用户是否登录状态
            req.session.isLogin = true;

            //设置登录过期状态时间
            let hour = 1000 * 60 * 60 * 10
            req.session.cookie.expires = new Date(Date.now() + hour);

            res.send({status: 200,msg: '登陆成功',data:result})
        })
    },
    handleRegisterPost:(req,res)=>{
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
    },

    handleLogoutGet:(req,res)=>{
        req.session.destroy(function(err) {
            // cannot access session here
            if(err) return alert('注销失败,请重试') ;
            res.redirect('/');
          })
    }
}

