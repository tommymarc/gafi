const express = require('../lib/express');
const app = express();
/**
 * 对比
 * 1.get 是指定多个处理函数
 * 2.中间件错误处理
 * 3.子路由系统 单独创建一个子路由系统，并且把它挂在在主路由系统上
 **/
/**
 * app.use
 * express.Router();
 **/
app.use(function(req,res,next){
    console.log('Ware1:',Date.now());
    next();
});
//路由是完整匹配的， '/'  '/user' 并不匹配
app.get('/',function(req,res,next){
    res.end('1');
});
//创建一个新的路由容器，或者路由系统
const user = express.Router();
user.use(function(req,res,next){
    console.log('Ware2',Date.now());
    next();
});
/*user.use('/2',function(req,res,next){
    res.end('2');
});*/

//在子路由里面的路径是相对于父路径  /user/2
user.get('/2',function(req,res,next){
    res.end('2');
});
//user 表示使用中间件，只需要匹配前缀就可以了
app.use('/user',user);// user 第二个参数是处理函数(req,res,next)
app.use(function(err,req,res,next){
    res.end('catch' + err);
});
app.listen(3000,function(){
    console.log('server started at port 3000');
});