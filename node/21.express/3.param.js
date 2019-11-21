const express = require('./express');
const app = express();
//  /user?name=xxx&age=8  返回给query
//  靠的是内置的中间件
app.get('/user',function(req,res){
    //查询字符串对象
    console.log(req.query);// {name:'xxx',age:8}
    console.log(req.path);//  /ueser
    console.log(req.hostname);// localhost
    res.end('ok')
})
app.listen(8080);