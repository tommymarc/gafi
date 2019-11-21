const express = require('express');
const path = require('path');
const html = require('../lib/html');
const app = express();
const fs = require('fs');

//views 是用来设置模版存放根目录
app.set('views',path.resolve('views'));
//设置模版引擎，如果render 没有指定模版后台名，会以这个作为后缀名
app.set('view engine','html');
//用来设置模版引擎，遇到html结尾的模版用html来进行渲染
// require('ejs').__express   render(filepath,options,callback)
// app.engine('.html',require('ejs').__express);
app.engine('.html',html);
app.use(function(req,res,next){
    res.render = function(name,options){
        let ext = '.'+ app.get('view engine');
        name = name.indexOf('.') != -1 ? name : name + ext;
        let filepath = path.join(app.get('views'),name);
        let render = app.engines[ext];
        function done(err,html){
            res.setHeader('Content-Type','text/html');
            res.end(html);
        }
        render(filepath,options,done)
    }
})