const express = require('express');
const session = require("express-session");
const path = require('path')
//RedisStore MongoStore
let FileStore = require('./store')(session);
const app = express();
app.use(session({
    //name:'sid'
    resave:true,
    saveUninitialized:true,
    rolling:true,
    secret:'xxx',
    store:new FileStore({
        root:path.join(__dirname,'sessions'),
        maxAge:10*1000
    })
    //genid(){
    //  return uuid.v4();
    // },
    //自定义存放session 的位置
    //store:
    // cookie:{
    //     maxAge: 10*1000*60
    //     expires: new Date(Date.now()+10000)
    // }

}))
//当使用session中间件后，会在req.session属性
//session就是客户端在服务器上保存的数据
//统计 客户端访问服务器的次数
app.get('/', function (req, res) {
    let visit = req.session.visit;
    if (visit) {
        visit = visit + 1;
    } else {
        visit = 1;
    }
    req.session.visit = visit;
    res.send(`欢迎你的第${visit}次光临`);
});
app.listen(8080);