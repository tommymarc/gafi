let net = require('net');
//创建一个服务器
//socket跟每个客户端连接，监听客户端请求，实现客户端跟服务器连接
//可实现
// 广播  b:内容     此客户端想要向所有的其他客户端广播
// 私聊  c:双方的用户名：内容   想向制定用户名发消息
// 列出在线用户列表  l：表示列出所有的在线用户信息列表
// 修改昵称    n：新名字   表示此客户端想要修改自己的名称
let clients = {};
let sever = net.createServer(function(socket){
    //remoteAddress 每个客户端的地址
    //socket.remotePort 每个客户端的端口号
    let key = socket.remoteAddress + socket.remotePort;
    socket.write('欢迎光临聊天室'+ key + '\r\n');
    clients[key] = {  //key 就是ip+端口号
        nickname:'匿名',   //当前用户名
        socket
    };
    socket.setEncoding('utf8');
    socket.on('data',function(data){
        data = data.replace(/\r\n/,'');
        let type = data.slice(0,1);
        switch(type){
            case'b':  //b:内容
                let text = data.slice(2);  //截取对应的内容
                boardcast(text);
                break;
            case'c': //c:双方的用户名：内容
                let values = data.split(':');
                let toUser = values[1];
                let toText = values[2];
                sendTo(toUser,toText);
                break;
            case'l':
                list();
                break;
            case'n':// n :新名字
                let newName = data.slice(2);
                let oldUserObj = clients[key];
                oldUserObj.nickname = newName;
                socket.write('你的用户名已经更改为'+ newName + '\r\n')
                break;
            default:
                socket.write('此命令不能识别，请重新输入!\r\n');
                break;
        }
    });
    socket.on('end',function(){
        socket.destroy();
    });
    //用户列表 l
    function list(){
        let result = '在线用户列表:\r\n';
        for(let user in clients){
            result +=clients[user].nickname+'\r\n';
        }
        socket.write(result)
    }
    function sendTo(toUser,text){
        let toUserObj;
        for(let user in clients){
            //如果对象中此key对应的对象的用户名跟想私聊的对方的用户名相同的话
            if(clients[user].nickname == toUser){
                toUserObj = clients[user];
                break;
            }
        }
        if(toUserObj){
            let {nickname} = clients[key];
            toUserObj.socket.write(`${nickname}:${text}`)
        }else{
            socket.write('用户名不正确或者对方已经下线了！');
        }
    }
    function boardcast(text){
        let {nickname} = clients[key];
        for(let user in clients){
            if(clients.hasOwnProperty(user) && user != key){
                clients[user].socket.write(`${nickname}:${text}`);            }
        }
    }
});
//监听8080 端口
server.listen(8080);