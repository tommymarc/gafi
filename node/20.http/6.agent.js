let http =require('http');
let userAgentParser = require('user-agent-parser')
let server = http.createServer(function(req,res){
    let userAgent = req.headers['user-agent'];
    console.log(userAgent);
    let userAgentObj = userAgentParser.parse(userAgent);
    res.end(JSON.stringify(userAgentObj));
});
server.listen(8080);