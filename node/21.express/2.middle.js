const express = require('express');
const app = express();
//使用use来定义一个中间件，next也是一个函数，调用它以为着当前的中间件执行完毕，可以继续执行下一个中间件
app.use(function(req,res,next){
    res.setHeader('Content-Type','text/html;charset=utf8')
    console.log('没有路径的中间件');
    //调用next的时候如果传一个任意参数就表示此函数发生了错误，然后express 就会跳过后面所有中间件内容
    //交给错误处理中间件处理
    next('出错了');
});
app.use('/water',function(req,res,next){
    console.log('过滤杂质');
    // res.end('over')
    next();
});
app.get('/water',function(req,res){
    res.end('water');
});
//错误处理中间件有四个参数
app.use(function(err,req,res,next){
   res.end('错误处理中间件'+err)
});
app.listen(8080,function(){
    console.log('server started at 8080')
});