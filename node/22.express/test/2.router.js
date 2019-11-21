const express = require('../lib/express');
const app = express();
//next 表示执行下一个
//路径的分组
//restful 风格的API 接口 GET /user | POST /user | DELETE  /user | PUT /user
//相同路径的接口 只匹配一次就可以了
app.get('/',function(req,res,next){
    console.log(1);
    next('Wrong'); //如果任何一步出错了，就会把错误交给next，然后就会跳过后面所有的正常处理函数，交给错误 处理中间件来进行处理
},function(req,res,next){
    console.log(11);
    next();
}).get('/',function(req,res,next){
    console.log(2);
    next();
}).get('/',function(req,res,next){
    console.log(3);
    res.end('ok');
});
/*app.get('/',function(req,res,next){
    console.log(1);
    next()
});
app.get('/',function(req,res,next){
    console.log(2);
    next()
});
app.get('/',function(req,res,next){
    console.log(3);
    res.end('ok')
})*/
app.listen(3000);