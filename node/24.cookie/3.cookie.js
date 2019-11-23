const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
app.use(cookieParser());
app.listen(8080);
/**
 * Set-Cookie:name=xxx; Domain = a.zfpx.cn; Path=/
 * domain 就是指定此cookie 是属于哪个域名的
 * session 只要窗口不关闭，cookie一直生效
 **/
app.get('/write',function(req,res){
    res.cookie2 = function(key,val,options){
        let {domain ,path ,maxAge, expires, httpOnly, secure } = options;
        let parts = [`${key} = ${val}`];
        if(domain){
            parts.push(`Domain=${domain}`);
        }
        if(path){
            parts.push(`Path = ${path}`);
        }
        if(maxAge){
            parts.push(`Max-Age= ${maxAge}`)
        }
        if(expires){
            parts.push(`Expires= ${expires.toUTCString()}`)
        }
        if(httpOnly){
            parts.push(`httpOnly`)
        }
        if(secure){
            parts.push(`secure`)
        }
        let cookie = parts.join('; ');
        res.setHeader('Set-Cookie',cookie);

    }
    res.cookie('name','xxx',{
        httpOnly:true,   //不允许客户端以浏览器的cookie访问  更安全
        secure:true, //只允许使用https协议 访问
        domain:'localhost',
        path:'/read2',
        maxAge:10*1000,//保存10秒，10秒后就失效了  设置cookie有效期
        expires:new Date(Date.now()+10*1000) //设置相对当前时间+10秒钟就失效了
    });
    res.end('ok');
});
app.get('/read',function(req,res){
    res.send(req.cookies);
});
//path 为/read1 都能够拿到cookie 的val
app.get('/read1',function(req,res){
    res.send(req.cookies);
});
app.get('/read1/1',function(req,res){
    res.send(req.cookies);
});