let express = require('express');
let http = require('http');
let bodyParser = require('body-parser');
let zlib = require('zlib');
//把字符串转换成对象 querystring qs  取决于extended
let querystring = require('querystring');
let qs = require('qs');
let app = express();
ap.use(bodyParser.text());   //处理文本请求体;
app.use(bodyParser.json());  //处理json 的请求体
app.use(bodyParser.urlencoded({extended:true}));//处理表单格式，也就是urlencoded 格式的请求体
//如果data 是数字的话，会把它当成状态码
app.use(function(req,res,next){

    res.send = function(data){
        let type = typeof data;
        switch(type){
            case 'object':
                data = JSON.stringify(data);
                break;
            case 'number':
                res.statusCode = data;
                data = http.STATUS_CODES[data];
                break;
            default:
                break;
        }
        res.end(data);
    }
    next();
})
//echo 回声， 客户端发过来的请求体是什么，服务器响应的响应体也是什么
app.post('/user',function(req,res){
    let body = req.body;
    //任何类型都可以转换成buffer 跟字符串
    res.send(body);//根据参数的类型进行兼容处理
    // res.json('{}') ////res.json  接受json对象转换成字符串 返回给客户端
    // res.end(body);//发送给客户端，结束响应，只支持buffer 跟 字符串
});
app.listen(8080);



//bodyParser urlencoded基本原理
function urlencoded(options){
    let {extended} = options; //extended 继承
    return function(req,res,next){
        let contentType = req.headers['content-type'];
        if(contentType == 'application/x-www-form-urlencoded'){
            let buffers = [];
            req.on('data',function(data){
                buffers.push(data);
            });
            req.on('end',function(){
                //name=xxx&age=8
                let result = buffers.toString();
                if(extended){
                    //qs 可以支持嵌套对象  {name:'xxx',home:{address:'beijing'}}
                    req.body = qs.parse(result);
                }else{
                    req.body = querystring(result);
                }
                next();
            })
        }else{
           next();
        }

    }
};

//bodyParser json 的基本原理
function json(){
    return function(req,res,next){
        let contentTye = req.headers['content-type'];
        if(contentType == "application/json"){
            let buffers = [];
            res.on('data',function(data){
                buffers.push(data);
            });
            res.on('end',function(){
                let result = buffers.toString(); // name = xxx
                req.body = JSON.parse(result);
                next();
            })
        }else{
            next();
        }
    }
}

//bodyParser text 的基本原理
function text(){
    return function(req,res,next){
        let contentTye = req.headers['content-type'];
        if(contentType == "text/plain"){
            let buffers = [];
            res.on('data',function(data){
                buffers.push(data);
            });
            res.on('end',function(){
                req.body = buffers.toString(); // name = xxx
                next();
            })
        }else{
            next();
        }
    }
}