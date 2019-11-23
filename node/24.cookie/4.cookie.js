let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser')
let app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }))
app.set('view engine','html');
app.set('views',path.join(__dirname,'views'));
app.engine('html',require('ejs').__express);
//判断用户是否登陆，如果登陆的话可以继续访问，如果不登陆，则跳到登陆页面
function checkLogin(req,res,next){
    if(req.cookies.username){
        next()
    }else{
        res.redirect('/login')
    }
}

app.get('/login',function(req,res){
    res.render('login',{
        title:'登陆'
    })
});
app.post('/login',function(req,res){
    let user = req.body;
    // console.log(user)
    if(user.username == '1' && user.password =='1'){
        res.cookie('username',user.username);
        //跳转入用户页面
        res.redirect('/user');
    }else{
        res.redirect('back')
    }
});
app.get('/user',checkLogin,function(req,res){
    let { username } = req.cookies;
    // console.log(username);
    res.render('user',{
        title:'登陆',username
    })
})


app.listen(8080);
