//实现Router 和应用的分离
const Router = require('./router');
const http = require('http');
//methods = http.METHODS
const methods = require('methods');//['get','post']
const slice = Array.prototype.slice;
function Application(){
    this._router = new Router();
}
Application.prototype.lazyrouter = function(){
    if(!this._router){
        this._router = new Router();
    }
};
Application.prototype.param = function(name,handler){
    this.lazyrouter();
    this._router.param.apply(this._router,arguments);
}
methods.forEach(function(method){
    Application.prototype[method] = function(path){
        this.lazyrouter();
        //这样写可以支持多个处理函数
        this._router[method].apply(this._router,slice.call(arguments));
        return this;
    }
})
/*Application.prototype.get = function(path,handler){
    this.lazyrouter();
    this._router.get(path,handler);
}*/
//添加中间件，而中间件和普通的路由都是放在一个数组中的，放在this._router.stack
Application.prototype.use = function(){
    this.lazyrouter();
    this._router.use.apply(this._router,arguments);
}
Application.prototype.listen = function(){
    let self = this;
    let server = http.createServer(function(req,res){
        function done(){//如果没有任何路由规则匹配的话会走此函数
            res.end(`Cannot ${req.method} ${req.url}`);

        }
        //如果路由系统无法处理，也就是没有一条路由规则跟请求匹配，是会把请求交给done
        self._router.handler(req,res,done);
        // let {pathname} = url.parse(req.url,true);
        // for(let i = 1; i < self.(router.length; i++){
        //      let {path,method,handler} = self.router[i];
        //      if(pathname == path && method == req.method.toLowerCase()){
        //          return handler(req,res);
        //      }
        // }
        // router[0].handler(req,res);
    });
    server.listen.apply(server,arguments);
    // server.listen(...arguments);
};
module.exports = Application;