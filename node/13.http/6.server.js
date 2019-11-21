let net = require('net');
let server = net.createServer(connectionListener);
function connectionListener(socket){
    socket.on('data',function(data){
        let {req,res} = parse(socket,data);
        this.emit('request',req,res);
    });
}
function parse(socket,data){
    //请求对象
    let req = parser(data);
    //响应对象
    let res = {write:socket.write.bind(socket), end:socket.end.bind(socket)};

    return {req,res}
}
server.on('request',function(req,res){
    req.headers;
    res.write();
});
server.listen(8080);