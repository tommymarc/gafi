const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid'); //唯一识别码
const app = express();
app.use(cookieParser());
//自己实现一套session的机制原理
//key 就是服务器向客户端写卡号时的name
const SESSION_KEY = 'connext.sid'; // 值可以随便写，但是有讲究
//记录每一个卡号和对应的数据的对应关系
const sessions = {};
app.get('/',function(req,res){
    let sessionId = req.cookies[SESSION_KEY];
    if(sessionId){
        let sessionObj = sessions[sessionId];
        if(sessionObj){
            sessionObj['balance'] -= 10; //余额减去10
            res.send(`你还剩下${sessionObj['balance']}`)
        }else{
            banKa()
        }
    }else{
        //如果没有sessionId,则创建一个ID
        banKa();
    }
    //1.卡号不能相同 2.最好不容易被猜出来
    function banKa(){
        //生成卡号ID
        let sessionId = uuid.v4();//生成32位随机字符串
        //在服务器端记录此卡号对应的余额 放在内存上
        sessions[sessionId] = { balance: 100 };
        res.cookie(SESSION_KEY,sessionId); //把记录跟卡号发给客户端
        res.send(`欢迎新客户，送你一张会员卡，余额100`)
    }
})
app.listen(8080);