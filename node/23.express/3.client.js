//客户端
let http = require('http');
let zlib = require('zlib');
//因为node不支持中国特有的编码GBK
let iconv= require('iconv-lite');
let body = iconv.encode('夏天','gbk');
let options = {
    host:'localhost',
    port:8080,
    method:'POST',
    path:'/user',
    headers:{
        'Content-Type':"applications/x-www-form-urlencoded",
        // 'Content-Type':"text/plain;charset=gbk"
        //压缩请求体
        "Content-Encoding":"gzip",  //代表请求体是经过压缩过的
    }
}
let req = http.request(options,function(response){
    //服务器发送什么，客户端响应什么
    response.pipe(process.stdout);
});
//压缩
zlib.gzip(body,function(err,data){//异步
    req.end("name=xxx&age=8");
});
/*req.write("name=xxx");
req.write("&age=8");
req.end();*/
// req.end("name=xxx&age=8");

