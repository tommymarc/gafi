/**
 * 把node 当作客户端 tcp模拟 HTTP客户端
 * 1. 写爬虫
 * 2. node 做中间层
 */
let http = require('http');
// 头 分四种： 通用头、请求头、响应头、实体头
let options = {
    //参数:  域名，端口，请求方法，请求头
    host: 'localhost',
    port: 8080,
    method: 'POST',
    headers:{
        "Content-Type":'application/x-www-form-urlencoded'
    }

};
//请求并没有真正发出  req也是一个流对象，它是一个可写流
let req = http.request(options);
//当服务器端把请求体发回来的时候，或者说客户端接收到服务器端响应的时候触发'respon'
req.on('response',function(res){
    console.log(rs.statusCode);//流码  200
    console.log(res.headers);  //响应头
    //响应体
    let result = [];
    res.on('data',function(data){
        result.push(data);
    })
    res.on('end',function(data){
        let str = Buffer.concat(result);
        console.log(str);
    })
})
//write 是向请求体里写数据
req.write('name=xxx');
//end  是结束写入请求体，只有在调用end 的时候才会真正向服务器发送请求
req.end();
