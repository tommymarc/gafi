const Layer = require('./layer');
const methods = require('methods');
const slice = Array.prototype.slice;
function Route(path){
    this.path = path;
    this.stack = [];
    //表示此路由有此方法的处理函数
    this.methods = {};
}
Route.prototype.handle_method = function(method){
    method = method.toLowerCase();
    return this.methods[method];
}
/*Route.prototype.get = function(handler){
    let layer = new Layer('/',handler);
    layer.method = 'get';
    this.methods['get'] = true;
    this.stack.push(layer);
};*/
methods.forEach(function(method){
    Route.prototype[method] = function(){
        let handlers = slice.call(arguments);
        this.methods[method] = true;
        for(let i = 0; i< handlers.length; i++){
            let layer = new Layer('/',handlers[i]);
            layer.method = method;
            this.stack.push(layer);
        }
        return this;
    }
})
Route.prototype.dispatch = function(req,res,out){
    let idx =0,self=this;
    function next(err){
        if(err){// 如果一旦在路由函数中出错误了，就跳出当前路由，执行下一个layer
            return out(err);

        }
        if(idx >= self.stack.length){
            return out();//route.dispatch里的out刚好是Router的next()
        }
        let layer = self.stack[idx++];
        if(layer.method == req.method.toLowerCase()){
            layer.handle_request(req,res,next);
        }else{
            next();
        }
    }
    next();
}

module.exports = Route