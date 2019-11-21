const express = require('express');
const app = express();
// : 意味着这个部分是一个占位符，用来匹配一个任意字符串
//  匹配的是字符串，而并不是一个固定的值
//  restful api    GET /user/1  获取ID为1的用户详情
// /user/xxx/9
// 路径参数 vue  react
// app.get('/user/:name/:age',function(req,res){
//     console.log(req.params);
//     res.end('ok')
// });
//param是用来处理路径参数的
//在此处保存路径参数名和处理函数
// app.params = {};  app.params['userid'] = handler;
app.param('userid',function(req,res,next,userid){
    req.user = getUser(userid);
    next();
});
function getUser(userid){
    return { userid:1, age:8, name:'xxx' };
};
function setUser(user){
    //想数据库里保存用户

};
// 接口用来 修改用户的name
app.get('/username/:userid/:name',function(req,res){
    // let user = getUser(req.params.userid);
    console.log(req.user);
    req.user.name = req.params.name;
    setUser(req.user);
    // console.log(req.params);
    res.end('update name successfully');
});
// 接口用来 修改用户的age
app.get('/userage/:userid/:age',function(req,res){
    // let user = getUser(req.params.userid);
    console.log(req.user);
    req.user.age = req.params.age;
    setUser(req.user);
    // console.log(req.params);
    res.end('update age  successfully');
});
app.listen(8080);