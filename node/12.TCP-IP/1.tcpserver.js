/**
 * TCP服务器
 **/
let net = require('net');
//创建服务器,监听客户端的连接，当客户端连接上来之后，执行监听函数
let server = net.createServer({},function(socket){
    console.log('服务器已经连接');
    console.log(socket.address());
    socket.on('data',function(data){
        console.log('接收到客户端发过来的数据:%s %s', data, 1);
        socket.write('服务器确认:'+data);
    });
    socket.on('error',function(err){
        console.log(err);
    });
    socket.on('end',function(){
        console.log('end');
    });
})
//监听一个ip，不写监听任何一个ip
// server.listen(8080,'127.0.0.0')；
//还可以是一个回调函数
server.listen(8080,function(){
    console.log(server.address());
    console.log('服务器启动成功');
})