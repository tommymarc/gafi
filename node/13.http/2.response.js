let http = require('http');
//如何向客户端写入响应信息
/**
  HTTP/1.1 200 OK                       响应行
  Date: Fri,02 Feb 2019 14:57:46 GMT    响应头
  Connection:Keep-alive
  Connection-Length: 9

  name = xxxx                           响应体
 Transfer-Encoding: chunked 分块传输
 */
let server = http.createServer(function(req,res){
    //在同一个方法里设置状态吗，原因短语，响应头
    res.setHeader('Content-Type','text/html');
    console.log('第一次发送',res.getHeader('Content-Type'));// 响应头是否已经发送
    //writeHead 一旦调用会立刻向客户端发送，setHeader
    res.writeHead(200,{
         "Content-Type":"text/html;charset=utf8"
     })
    //当调用writeHead 或者调用write方法的时候才会想客户端发响应头
    console.log('第二次发送',res.getHeader('Content-Type'));// 响应头是否已经发送

    /*
    res.statusCode = 200; //设置响应码
    res.sendDate = false; //Date响应头默认会设置，如果真的不想要，可以设置为false
    res.setHeader('Content-Type','text/html;charset-utf8');//设置响应头
    //获取响应头   第一次获取
    console.log(res.getHeader('Content-Type'));
    res.removeHeader('Content-Type');
    //获取响应头   第二次获取
    console.log(res.getHeader('Content-Type'));
    res.write('hellow');
    res.write('world');
    res.end();
    //res.write('bye');//ERROR: write after end 在可写流结束之后再次写入

     */
});
server.listen(8080);