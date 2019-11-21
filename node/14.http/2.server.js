let http = require('http');
let path = require('path');
let url = require('url');
let zlib = require('zlib');
let { promisify } = require('util');
//可以通过文件的名称或者路径，拿到文件的内容、类型; 安装 npm i mine -S
let mime = require('mime');
//promisify 把一个异步方法转换成一个返回promise的方法
let stat = promisify(fs.stat);

/**
 * 客户端向服务器发起请求的时候，会通过 accept Encoding告诉服务器直接的解压缩的格式
 * Accept-Encoding:gzip,deflate
 */
http.createServer(request).listen(8080);
async function request(req,res){
    let {pathname} = url.parse(req.url);// /msg.txt
    //  \direvtor\node\14.http\msg.txt
    let filepath = path.join(__dirname,pathname);//请求路径 下的pathname
    // fs.stat(filepath,(err,stat)=>{})
    //等待promise 的resolve reject
    try{ //同步方法写 promisify
        let statObj = await stat(filepath);
        //可以根据不同的文件内容类型返回不同的Content-Type
        res.setHeader('Content-Type',mime.getType(pathname));
        //拿到acceptEncoding 类型
        //'accept-encoding' 为了兼容不同的浏览器，node把所有的请求头全转成了小写
        let acceptEncoding = req.header['accept-encoding'];
        //内容协商， 客户端和服务器端
        //客户端告诉服务端：想要啥， 服务器端告诉客户端：自己有啥
        //客户端想要，服务器端可以提供，才能执行
        if(acceptEncoding){
            //如果存在的话
            if(acceptEncoding.match(/\bgzip\b/)){
                //服务器告诉 客户端：要用什么压缩方法压缩
                res.setHeader('Content-Encoding','gzip');
                fs.createReadStream(filepath).pipe(zlib.createGzip()).pipe(res);
            }else if(acceptEncoding.match(/bdeflate\b/)){
                //服务器告诉 客户端：要用什么压缩方法压缩
                res.setHeader('Content-Encoding','deflate');
                fs.createReadStream(filepath).pipe(zlib.createDeflate()).pipe(res);
            }else{
                fs.createReadStream(filepath).pipe(res);
            }
        }else {
            //如果accept不支持任何编码，就不压缩
            //找到文件 就可以直接promise来写
            fs.createReadStream(filepath).pipe(res);
        }
    }catch(e){
        //报错 ： 文件找不到 404
        res.statusCode = 404;
        res.end();
    }
}