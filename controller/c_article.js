const moment = require('moment');
const conn = require('../db/db');
//导入转换markdown格式中间件
const marked = require('marked');
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
        //作者id
        req.body.author_id = req.session.user.id;
        //提交时间
        req.body.ctime = moment().format('YYYY-MM-DD HH:mm:ss');
        
        const sql = 'insert into articles set ?';
        conn.query(sql,req.body,(err, result)=>{
            if(err) return res.status(500).send({status: 500,msg: '发表失败,请重试'});
            if(result.affectedRows != 1) return res.status(400).send({status: 400,msg: '发表失败,请重试'});
            // console.log(result);
            res.send({status: 200,msg: 'success',articleId: result.insertId })
        })

    },
    handleArticalInfoGet:(req,res)=>{
        const id = req.params.id;
        const sql = 'select * from articles where id = ?';
        conn.query(sql,id,(err,result)=>{
            if(err) return res.send({status: 500,msg: '获取文章信息失败,请重试'});
            if(result.length != 1) return res.redirect('/');
            // console.log(result[0]);
            //把文本转换成markdown格式
            result[0].content = marked(result[0].content);
            //渲染页面
            res.render('./article/info.ejs',{
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
        })   
    }
}