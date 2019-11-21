//resume pause
let net = require('net');
//建立可写流
let ws = require('fs').createWriteStream('./msg.txt');
// let ws = require('fs').createWriteStream(path.join(__dirname,'msg.txt'));
//socket 代表跟客户端的链接
let server = net.createServer(function(socket){
    //流暂停
    socket.pause();
    //设置客户端的超时时间，如果客户端一直不输入超过一定的时间就认定超时了
    socket.setTimeout(3*1000);
    //write after end 在文件关闭掉之后再次写入
    socket.on('timeout',function(){
        //默认情况下，当可读流读到末尾的时候会关闭可写流
        socket.pipe(ws,{end:false});
    })
    /*
     setTimeout(function(){
         //在默认情况下，当可读流读到末尾的时候，会关闭可写流
         //pipe的原理，边读边写
         socket.pipe(ws,{end:false});//参数{end:false}，当你关闭后不要关闭可写流，还有数据要写入
     },10*1000);*/
});
server.listen(8080);