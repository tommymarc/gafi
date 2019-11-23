//内置中间件  static 静态文件中间件
let express = require('express');
let path = require('path');
let fs = require('fs');
//取得文件的内容类型
let mime = require('mime');
let url = require('url');
let app = express();
//此中间件会拦截客户端的请求，然后去静态文件目录下面找一下有没有对应的文件
//如果有则返回给客户端，如果没有则next往下面走
function static(root,options = {}){
    let {dotfiles = 'ignore', etag = true,lastModified = true ,setHeaders} = options
    //所有的中间件模块都是一个方法，然后调用此方法都会返回一个中间件函数
    return function(req,res,next){
        let {pathname} = url.parse(req.url,true);//pathname = /index.html
        let file = path.join(root,pathname);//连在一起就得到了此文件的绝对路径
        //stat 兼容处理，看文件是否在
        //取一个文件的详细信息，状态对象
        //file = 'xxx/xxx/.gitignore'  .开头的文件都是系统文件，或者内部文件，不允许访问
        //  /a/b/c.html    [a,b,c.html]
        let parts = file.split(path.sep);
        //判断最后一个是否是 '.' 开头
        let isDotFile = parts[parts.length -1][0] =='.';
        if(isDotFile && dotfiles =='deny'){//拒绝访问'.'的隐藏文件
            // return next();
            res.setHeader('Content-Type','text/html');
            res.statusCode = 403; //客户端无法访问此文件
            return res.end(http.STATUS_CODES[403]); //Not Allowed
        }
        fs.stat(file,function(err,stat){
            if(err){//如果没有这个文件，会报错
                next();
            }else{
                let contentType = mime.getType(pathname);
                res.setHeader('Content-Type',contentType);
                if(etag){
                    //生成标识符   哈希算法
                    res.setHeader('ETag',stat.mtime.toLocaleDateString());
                }
                if(lastModified){
                    res.setHeader('Last-Modified',stat.mtime.toUTCString())
                }
                res.setHeader('Cache-Control',`max-age = ${maxAge}`);
                if(setHeaders){
                    setHeaders(req,res,function(){
                        fs.createReadStream(file).pipe(res);
                    })
                }
            }
        })
    }

}
//static(root,[options])   root根目录，静态文件放置位置
// app.use(express.static(path.join(__dirname,'public')));
app.use(static(path.join(__dirname,'public')),{
    extensions:['html','htm'],
    setHeaders(req,res,callback){//设置自定义响应头
        res.setHeader('time',Date.now());
    }
});
//客户端会访问/user   这个不是一个静态文件，则直接next进入
app.get('/user',function(req,res){
    res.end('user')
})

app.listen(8080);