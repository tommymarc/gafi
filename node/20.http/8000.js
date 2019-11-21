let http = require('http');
let proxyServer = require('http-proxy');
let server = http.createServer(function(req,res){
    res.end('8000');
}).listen(8000);