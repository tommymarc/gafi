//写一个客户端
let net = require('net');
let client = new net.Socket();
/**
 * 连接服务器
  参数：域名 ip 端口号
  port  Socket 连接的端口
  host  Socket 连接的主机，默认是 'localhost'
  localAddress Socket 连接的本地地址
  localPort  Socket 连接的本地端口
  family    IP栈的版本，可以是4或6，默认值为4
  hints     可选的 dns.lookup() hints.
  lookup    自定义的lookup方法，默认是dns.lookup
 */

client.connect(8080,'localhost',function(){
    client.write('hello');
});
client.setEncoding('utf8');
client.on('data',function(data){
    console.log(data);
});
//等客户端连接5秒后
setTimeout(function(){
    //要求关闭跟服务器的连接
    client.end();
},5000)