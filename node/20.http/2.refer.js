/**
 * 图片防盗链
 * @type {module:http}
 */

let http = require('http');
let fs = require('fs');
let url = require('url');
let path = require('path');
//白名单  名单内的域名都可以使用该图片
const whiteList = [
    '192.168.0.22',
    'localhost'
]
let server = http.createServer(function(req,res){
    let refer = req.headers['referer']||req.headers['refer'];
    //如果说有refer的话，则表示是从HTML页面中引用过来的
    if(refer){
        // http://192.178.0.22:8080/refer.html
        // http://imgsrc.baidu.com/g6.jpg
        let referHostName = url.parse(refer,true).hostname;//192.168.0.22
        let currentHostName = url.parse(req.url,true).hostname;//imgsec.baidu.com
        // console.log(urlObj);
        //如果访问域名不为本地域名
        // if(referHostName != currentHostName){
        if(referHostName != currentHostName && whiteList.indexOf(referHostName) == -1){
            res.setHeader('Content-Type','image/jpg');
            fs.createReadStream(path.join(__dirname,'forbidden.jpg')).pipe(res);
            return
        }

    }
    res.setHeader('Content-Type','image/png');
    fs.createReadStream(path.join(__dirname,'g6.jpg')).pipe(res);
});
server.listen(3000);