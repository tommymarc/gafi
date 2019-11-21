/**
 * TCP
 */
let net = require('net');
//当客户端连接上来的时候会执行对应的回调函数
//socket 其实是一个可读可写流，是一个双工流
let server = net.createServer({},function(socket){//socket 客户端，插座，实现回调通信
    //表示客户端可连接的总数量是2个
    server.maxConnections = 2;
    //获取当前有多少个客户端正在连接服务器
    server.getConnections((err,count)=>{
        console.log(`欢迎光临，现在连接的客户端的总数量是${count}个，客户端可连接的总数量是${server.maxConnections}`);
    });
    console.log(socket.address());
    //设置编码，避免每次都用toString转译
    socket.setEncoding('utf8');
    //如果获得可读流内的数据？
    //on('data') 进入流动模式
    socket.on('data',function(data){
        console.log(data);
    });
    //服务器收到客户端发出的关闭连接请求时，会触发end事件
    socket.on('end',function(){
        console.log('客户端已关闭');
        //close 服务器端有一个方法叫close，
        //close 的意思是如果执行了此方法，那么此客户端将不再接收新的连接
        //但是也不会关闭现有服务器
        //一旦调用此方法，则当所有的客户端关闭跟本服务器的连接后，将关闭服务器
        //当所有客户端都关闭了，关闭本服务器
        //server.unref();
    });
    setTimeout(function(){
        //在5秒后会关闭掉此服务器，不再接收新的客户端
        //老的客户端可以继续连接，新的客户端无法连接
        server.close();
        //一旦调用此方法，则当所有的客户端关闭跟本服务器的连接后，将关闭服务器
        //server.unref();
    },5000)
    //如果hasError为true 表示异常关闭，否则表示正常关闭
    socket.on('close',function(hasError){//如果突然间服务器断开，比方断电等error
        console.log('客户端真正关闭',hasError);
    });
    socket.on('error',function(err){
        console.log(err);
    })
});
server.on('close',function(){
    console.log('服务器端已关闭');
});
server.on('error',function(err){
    // console.log('服务器端有错误');
    console.log(err);
})
server.listen(8080,function(){
    console.log(server.address());
    console.log('服务器端已经启动');
});