const Route = require('./route');
const Layer = require('./layer');
const url = require('url');
const slice = Array.prototype.slice;
const methods = require('methods');
const init = require('../middle/init');
function Router(){
    function router(req,res,next){
        router.handler(req,res,next);
    }
    Object.setPrototypeOf(router,proto);
    router.stack = [];
    //生命一个对象，用来缓存路径参数名它对应的回调函数数组
    router.paramCallbacks = {};
    //在router一加载就会加载内置 中间件
    //query
    router.use(init);
    return router;
}
let proto = Object.create(null);
//创建一个route 实例，向当前路由系统中添加一个stack 层
proto.route = function(path){
    let route = new Route(path);
    let layer = new Layer(path,route.dispatch.bind(route));
    layer.route = route;
    this.stack.push(layer);
    return route;
};
proto.use = function(path,handler){
    //如果path 没有传入参数，则path为 handler，而path为'/'
    if(typeof handler != 'function'){
        handler = path;
        path = '/';
    }
    //中间件，没有路由
    let layer = new Layer(path,handler);
    layer.route = undefined;//我们正式通过layer有没有route来判断是一个中间件函数还是一个路由
    this.stack.push(layer);
}
methods.forEach(function(method){
    proto[method] = function(path){
        let route = this.route(path); //是在往Router里添加一层
        route[method].apply(route,slice.call(arguments,1))
        return this;
    }
})
/*Router.prototype.get = function(path,handler){
    let route = this.route(path);//是在往Router里添一层
    route.get(handler); //向Route里添加一层
}*/
proto.param = function(name,handler){
    if(!this.paramsCallbacks[name]){
        this.paramCallbacks[name] = []
    }
    this.paramCallbacks[name].push(handler);
};
proto.process_params = function(layer,req,res,done){
    const paramCallbacks = this.paramCallbacks;
    const keys = layer.keys;
    if(!keys || keys.length == 0){
        return done();
    }
    let keyIndex = 0,name,callbacks,key,val;
    function param(){
        if(keyIndex >=keys.length){
            return done();
        }
        key = keys[keyIndex++];
        name = key.name;
        val = req.paramCallbacks[name];
        callbacks = paramCallbacks[name];
        if(!val || !callbacks){
            return param();
        }
        execCallback();
    }
    let callbackIndex = 0;
    function execCallback(){
        let cb = callbacks[callbackIndex++];
        if(!cb){
            return param();
        }
        cb(req,res,execCallback,val,name)
    }
    param();
}
/**
 * 1.处理中间件
 * 2.处理子路由容器
**/
proto.handler = function(req,res,out){
    //缓存一下索引 this指针
    //slashAdded 是否添加过'/'   removed 指的是否是被移除的字符串
    let idx = 0,self = this,slashAdded = false,removed = '';
    let {pathname} = url.parse(req.url,true);
    function next(err){
        if(removed.length > 0){
            req.url = removed + req.url;
            removed = '';
        }
        if(idx >= self.stack.length){
            return out(err);
        }
       let layer = self.stack[idx++];
        if(layer.match(pathname)){
            if(!layer.route){ //这一层是中间件层  /user/2
                removed = layer.path; //  /user
                req.url = req.url.slice(removed.length);//   /2
                if(err){
                    layer.handle_error(err,req,res,next);
                }else{
                    layer.handle_request(req,res,next);
                }
            }else{
                if(layer.route
                    && layer.route.handle_method(req.method)){
                    layer.handle_request(req,res,next);
                }else{
                    next(err);
                }
            }
        }else{
            next(err)
        }

        /**
         if(layer.match(pathname)
         && layer.route
         && layer.route.handle_method(req.method)){
            // layer.handler();
            if(err){
                layer.handle_err(err,req,res,next);//专门处理错误
            }else{
                layer.handle.request(req,res,next);
            }
            layer.handle_request(req,res,next);

        }else{
            next();
        }
         **/


    }
    next();
}
module.exports = Router;
/**
 * Router
 *      stack
 *          layer
 *              path route
 *                  method handler
 * Layer
 * Router Layer 路径 处理函数(router)
 **/