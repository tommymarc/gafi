let express = require('express');
let app = express();
app.use(function(req,res,next){
    res.setHeader('Content-Type','text/plain;charset=utf8');
    next();
})
app.get('/signup',function(req,res){
    console.log('注册');
    res.end('注册');
});
app.get('/signin',function(req,res){
    res.end('登陆')
});
app.get('/signout',function(req,res){
    res.end('退出');
});
app.all('*',function(req,res){
    res.send('找不到')
})
app.listen(8080);