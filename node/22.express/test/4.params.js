const express = require('express');
const app = express();
//用来批量处理路径参数
app.param('uid',function(req,res,next,val,name){
    req.user = {id:1,name:'xxx'};
    next();
});
app.param('uid',function(req,res,next,val,name){
    req.user.name = 'xxx2';
    next();
});
//路径参数 这个参数是在路径里面的
//vue angular react      params
//    /user/([^\/]+?)     /user/1
app.get('/user/:uid',function(req,res){
    console.log(req.params);//路径参数对象      params : {uid:1}
    console.log(req.user);
    res.end('user');
});
app.listen(3000);