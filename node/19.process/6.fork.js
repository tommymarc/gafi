/**
 * send方法其实可以有两个参数
 * 第一个参数是任意类型
 * 第二个参数只能是http server net server socket
 */
/*
let {fork} = require('child_process');
let p1 = fork('server.js',[],{
    cwd:__dirname
});
let http = require('http');
let server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html;charset-utf8')
    res.end(' 请求被处理')
});
//把server 发给子进程
server.listen(8080);
p1.send('server',server);

 */
let {fork} = require('child_process');
let os = require('os');
let http = require('http');
let server = http.createServer(function(req,res){
    res.setHeader('Content-Type','text/html;charset-utf8')
    res.end(' 请求被处理')
});
//把server 发给子进程
server.listen(8080);

for(let i=0; i < os.cpus.length; i++){
    let p1 = fork('server.js',[],{
        cwd:__dirname
    });
    p1.send('server',server);
}

//一般一个核对应一个服务、进程
//os.cpus()  方法返回一个对象数组，包含每个逻辑cpu内核的信息

