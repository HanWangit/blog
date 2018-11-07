const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'blog',
    // 开启执行多条Sql语句的功能
    multipleStatements: true
})

module.exports = conn;