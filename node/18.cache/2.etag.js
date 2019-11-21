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
//  http://localhost:8080/index.html
http.createServer(function(req,res){
    let {pathname} = url.parse(req.url,true);
    //获取文件
    let filepath = path.join(__dirname,pathname);//当前目录+当前路径
    fs.stat(filepath,(err,stat)=>{//拿到文件的内容。err错误，stat 文件内容
        if(err){
            //如果不存在，发送一个错误，req请求,res响应
            return sendError(req,res);
        }else {
            let ifNoneMatch = req.headers['if-none-match'];// 自从上次修改后，是否有修改
            let out = fs.createReadStream(filepath);
            let md5 = crypto.createHash('md5');
            out.on('data', function (data) {
                //默认的highWaterMark 64k   内容摘要量64k
                md5.update(data);
            });
            out.on('end', function () {
                //1.相同的额输入 相同的输出
                //2.不同的输入不同的输出
                //3.不能从输出反推出输入
                let etag = md5.digest('hex')
                if (ifNoneMatch == etag) {
                    //判断文件内容是否一样
                    res.writeHead(304);
                    res.end();
                } else {
                    return send(req, res, filepath, etag);
                }
            });
        }
    })
}).listen(8080);
//stat 文件的描述，文件内容、大小、修改时间、文件类型...
function send(req,res,filepath,etag){
    res.setHeader('Content-Type',mime.getType(filepath));
    //第一次服务器返回的时候，会把文件的内容算出来一个标识，然后发给客户端
        //客户端看到ETag之后，会把此标志符保存在客户端，下次再访问服务器的时候，发给服务器
        res.setHeader('ETag',etag);
        fs.createReadStream(filepath).pipe(res);
}
function sendError(req,res){
    // res.writeHead(400,{'Content-Type':text/html});
    // res.end(err?err.toString():'Not Found');
    res.end('Not Found');
}