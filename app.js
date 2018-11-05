const express = require('express');
const app = express();


app.set('view engine','ejs'); //设置默认引擎模板
app.set('views','./public'); //设置模板默认路径

app.use('/node_modules',express.static('./node_modules')); //托管资源

app.get('/',(req,res)=>{
    res.render('index.ejs',{});
})


app.listen(80,()=>{
    console.log('http://127.0.0.1');
})