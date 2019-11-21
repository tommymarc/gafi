/**
 * 弹性计算云服务器  ECS 就一个完整的服务器
 * 虚拟主机  你得到的值只是此服务器上的一个目录(群居服务器)
 **/
let http = require('http');
let proxyServer = require('http-proxy');
let server = http.createServer(function(req,res){
    res.end('80')
}).listen(80)