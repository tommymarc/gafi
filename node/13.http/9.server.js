/**
 * 1. http服务器的源码，解释请求头
 *    - 只要知道http服务器和tcp服务器关系
 *    - req和res 都是从socket来的，先监听socket的data事件，然后等事件发生的时候进行解析
 *      解析出请求头对象，再创建 请求对象；再根据请求对象创建响应对象
 * 2. http客户端
 * 3. 压缩和加密
 **/
let http = require('http');
let querystring = require('querystring');// 转换类别模块
let server = http.createServer();
server.on('request',function(req,res){
    res.end('ok');
    console.log(req.url);
    console.log(req.method);
    let result = [];
    req.on('data',function(data){
        result.push(data);
    });
    req.on('end',function(){
        let str = Buffer.concat(result).toString();
        //如何把字符串转换成对象
        let contentType = req.headers['content-type'];
        let body;
        if(contentType == 'application/x-www-form-urlencoded'){
            //如果类型为 encoded
            //把调用的字符串转换成对象
            body = querystring.parse(str);
        }else if(contentType == 'application/json'){
            //如果类型为 JSON
            body = JSON.parse(str);
        }else{
            //否则 直接转换
            body = querystring.parse(str)
            // fs.write();
        }
        res.end(JSON)
    })
});
server.listen(8080);