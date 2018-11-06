const moment = require('moment');
const conn = require('../db/db');
module.exports = {
    handleArticalAddGet: (req,res)=>{
        //验证如果没登录,则返回首页
        if(!req.session.isLogin) return res.redirect('/');
        
        res.render('./article/add.ejs',{
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },
    handleArticalAddPost: (req,res)=>{
        const body = req.body;
        //作者id
        body.author_id = req.session.user.id;
        //提交时间
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const sql = 'insert into articles set ?';
        conn.query(sql,body,(err, result)=>{
            if(err) return res.status(500).send({status: 500,msg: '发表失败,请重试'});
            res.send({msg: 'success',authorId: body.author_id })
        })

    }
}