//如何创建一个http服务器
//http服务器是继承自TCP服务器 http协议是应用层协议，是基于TCP的
//对请求和响应进行包装。
let http = require('http');
//req  流对象  是一个可读流  read()
//res  流对象  是一个可写流  writer()
//发消息就等于客户端连接吗？不等
let server = http.createServer();
let url = require('url');
//connection  当客户端连接上服务器之后执行回调
server.on('connection',function(socket){
    console.log('客户端已经连接')
});
/**
  GET / HTTP/1.1             请求方法  请求行
  Host: localhost:8080         请求头
  User-Agent: curl/7.53.0
  Accept:
  Content-Length: 9
  Content-Type: application/x-www-form-urlencoded

  [9 bytes data]                请求体
 */
//服务器监听客户端的请求，当有请求到来的时候执行回调
//req 代表客户端的连接，server服务器把客户端的请求信息进行解析，然后放在req上面
//res 代表响应，如果希望向客户端回应消息，需要通过 res
server.on('request',function(req,res){
    console.log(req.method); //获取请求方法名
    let {pathname,query} = url.parse(req.url,true);
    console.log(pathname);
    console.log(query);
    console.log(req.url);   // 获取请求路径
    // console.log(req.protocal); //协议
    console.log(req.headers); //请求头对象
    let result = [];
    req.on('data',function(data){// data是一个buffer
        result.push(data);
    });
    req.on('end',function(){
        //把buffer数组累加在一起，返回一个大buffer
       let r = Buffer.concat(result);// 请求体
        res.end(r);
    });
});
server.on('close',function(req,res){
    console.log('服务器关闭')
});
server.on('error',function(err){
    console.log('服务器错误')
})
server.listen(8080,function(){
    console.log('server started at http://localhost:8080')
})



/*
let server = http.createServer(function(req,res){

}).listen(8080,function(){
    console.log('server started at http://localhost:8080')
});
 */