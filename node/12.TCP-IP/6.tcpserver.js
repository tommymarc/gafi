//写一个聊天室 可以设置昵称 可以广播
const net = require('net');
let clients = {};
let server = net.createServer(function(socket){
    server.getConnections((err,count)=>{
        socket.write('欢迎广陵本聊天室，现在在线人数是'+ count +'位，请输入你的昵称\r\n');
    });
    //第一步给username赋值
    let username;
    //监听客户端发来的data事件
    socket.on('data',function(data){
        data = data.replace(/\r\n/,'')
        if(username){//如果有值，说明设置了昵称
            broadcast(username,`${username}:${data}`);
        }else{
            if(clients[data]){
                socket.write('你的用户名已经被人用了，请你换一个新的哦那个户吧\r\n');
            }else{
                //把用户输入的信息当成用户名
                username = data;
                //把用户的socket所有值都缓存下来，方便以后广播用
                clients[username] = socket;
                //广播：向所有客户端发送消息
                broadcast(username,`欢迎${username}加入聊天室`);
            }
        }
    });
    socket.on('end',function(){
        //向所有客户端发送消息
        breadcast(username,`欢送${username}离开聊天室`);
        clients[username] && clients[username].destroy();//销毁此socket
        //把客户端的值删除掉
        delete clients[username]
    })
});
//广播：向所有客户端发送消息
function broadcast(username,msg){
    for(let name in clients){//拿到每个用户的用户名
        if(name !=username){
            //如果该名字不存在
            clients[name].write(msg+'\r\n');
        }
    }
}
server.listen(8080,()=>{
    console.log('TCP聊天室已经启动成功，信息时', server.address());
})