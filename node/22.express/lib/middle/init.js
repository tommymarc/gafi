//处理query  path
//req.query   req.path
const url = require('url');
module.exports = function(req,res,next ){
       let {pathname,query} =  url.parse(req,res,true)
        req.query = query;
        req.path = pathname;
        res.json = function(obj){
            res.setHeader('Content-Type','application/json');
            const str = JSON.stringify(obj);
            res.end(str);
        }
    next();
}