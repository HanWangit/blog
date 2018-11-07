//导入数据库
const conn = require('../db/db');

module.exports = {
    handleIndexGet:(req,res)=>{
        //设置文章每页显示文章数量
        const pageSize = 5;
        const nowPage = parseInt(req.query.page) || 1;

        // 获取所有文章数据
        const sql = `SELECT a.id,a.title,a.ctime,u.nickname FROM articles AS a 
                    LEFT JOIN user AS u ON u.id = a.author_id 
                    ORDER BY a.id DESC LIMIT ${(nowPage-1)*pageSize},${pageSize};
                    SELECT count(*) AS count FROM articles`
        conn.query(sql,(err,result)=>{
            if(err) return res.render('index.ejs',{
                    user: req.session.user,
                    isLogin: req.session.isLogin,
                    articles: []
                });
            //分页数量,向上取整
            const totalPage = Math.ceil(result[1][0].count / pageSize); 
            // console.log(totalPage);
            //成功的返回结果
            res.render('index.ejs',{
                user: req.session.user,
                isLogin: req.session.isLogin,
                articles: result[0],
                pageSize: pageSize,
                totalPage: totalPage,
                nowPage : nowPage
            })
        })
    }
}