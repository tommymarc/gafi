//当客户端访问服务器的时候，服务器会发送给客户端一个文件
let net = require('net');
let rs = require('fs').createReadStream('./1.test');
net.createServer(function(socket){
    rs.on('data',function(data){
        let flag = socket.write(data);//可写流缓存区是否满了
        console.log('flag= ',flag);
        //如果写不进去了 就缓存在socket.bufferSize里面
        console.log('缓存的字节数',socket.bufferSize);
    });
    //socket缓存区排空事件
    socket.on('drain',function(){
        console.log('TCP缓存区中的数据已经发送');
    })
}).listen(8080);