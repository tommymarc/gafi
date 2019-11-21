//通过最后修改事件来判断缓存是否可用
/**
 * 1.第一次访问服务器的时候，服务器返回资源和缓存的规则，客户端则会把此资源缓存在本地的缓存数据库中
 * 2.第二次客户端需要此数据的时候，要取得缓存的标识，然后去问一下服务器我的资源是否是最新的。
 *   - 如果是最新的则直接使用缓存数据，如果不是最新的则服务器返回新的资源和缓存规则，客户端根据新的缓存规则缓存新的数据
 */
let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');
let mime = require('mime'); //获取到文件的 Content-Type
let crypto = require('crypto');// md5 hash算法
 /**
  * 强制缓存
  * 把资源缓存在客户端，如果客户端再次需要此资源的时候，先获取到缓存中的数据，看是否过期，
  * 如果过期了，再请求服务器
  * 如果没过期，则根本不需要向服务器确认，直接使用本地缓存即可
  **/
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url,true);
    //获取文件
    let filepath = path.join(__dirname,pathname);//当前目录+当前路径
    console.log(filepath)
    fs.stat(filepath,(err,stat)=>{//拿到文件的内容。err错误，stat 文件内容
        if(err){
            //如果不存在，发送一个错误，req请求,res响应
            return sendError(req,res);
        }else {
            send(req,res,filepath)
        }
    })
}).listen(8080);
//stat 文件的描述，文件内容、大小、修改时间、文件类型...
function send(req,res,filepath){
    res.setHeader('Content-Type',mime.getType(filepath));
    //expires 制定了此缓存的过期时间，此响应头是1.0定义，在1.1里面已经不再使用了
    res.setHeader('Expires',new Date(date.now()+30*1000).toUTCString());
    //Chache-Control 缓存控制
    //max-age 10秒钟不需要返回服务器，过后则返回服务器
    res.setHeader('Cache-Control','max-age=10');
    fs.createReadStream(filepath).pipe(res);
}
function sendError(req,res){
    // res.writeHead(400,{'Content-Type':text/html});
    // res.end(err?err.toString():'Not Found');
    res.end('Not Found');
}