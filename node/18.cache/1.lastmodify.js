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
//  http://localhost:8080/index.html
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url,true);
    //获取文件
    let filepath = path.join(__dirname,pathname);//当前目录+当前路径
    fs.stat(filepath,(err,stat)=>{//拿到文件的内容。err错误，stat 文件内容
        if(err){
            //如果不存在，发送一个错误，req请求,res响应
            return sendError(req,res);
        }else{
            let ifModifiedSince = req.headers['if-modified-since'];// 自从上次修改后，是否有修改
            let LastModified = stat.ctime.toGMTString();//最新修改时间
            if(ifModifiedSince == LastModified){
                //判断最后发给数据时间，跟最新时间是否一样
                res.writeHead(304);
                res.end();
            }else {
                return send(req, res, filepath, stat);
            }
        }

    })
}).listen(8080);
//stat 文件的描述，文件内容、大小、修改时间、文件类型...
function send(req,res,filepath,stat){
    res.setHeader('Content-Type',mime.getType(filepath));
    //发给客户端之后，客户端会把此时间保存起来，下次再获取此资源的时候会把这个时间再发回服务器
    res.setHeader('Last-Modified',stat.ctime.toGMTString());//最后修改时间
    fs.createReadStream(filepath).pipe(res);
}
function sendError(req,res){
    // res.writeHead(400,{'Content-Type':text/html});
    // res.end(err?err.toString():'Not Found');
    res.end('Not Found');
}