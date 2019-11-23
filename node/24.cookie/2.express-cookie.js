const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
//所有中间件都是方法函数，需要执行
app.use(cookieParser('xxx')); //添加一个密钥'xxx'
app.get('/write',function(req,res){
    //signed = true 表示要加密 ,签名的意思
    //基于真实的值和密钥xxx 签了一个名，一旦值被人改掉了，则签名验证会失败
    res.cookie('name','xxx',{ signed:true});
    res.cookie('age','8');
    res.end('write ok')
});
app.get('/read',function(req,res){
    // let cookie = req.headers['cookie'];// name =xxx
    //服务器的cookie 会根据客户端的cookie改变而改变 因此要防止客户端串改，修改签名后，签名不对，就无法读取
    res.send(req.cookies); //取值 {'name':"xxx"}   只能读到未签名的cookie
    console.log(req.signedCookies);//读取加密的值

})


app.listen(8080);

//cookie 的原理
function cookie(name,value,options = {}){
    let {signed = false } = options;
    if(signed){
        value = sign(value,ap.secret);
    }
    let last = res.getHeader('Set-Cookie');
    if(last){
        last.push(`${name} = ${value}`);
    }else{
        last = [`${name} = ${value}`];
    }
    res.setHeader('Set-Cookie',last);
}
//signed = true 表示要加密