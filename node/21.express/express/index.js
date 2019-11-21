
const http =require('http');
const url = require('url');
function createApplication(){
    //app 其实就是真正的请求监听函数
    let app = function(req,res){
        const {pathname} = url.parse(req.url,true);
        let index = 0;
        function next(){
            if(index >= app.routes.length){
               return res.end(`Cannot ${req.method} ${pathname}`);
            }
            let route = app.routes[index++];
            if(err){
                //先判断是不是中间件
                if(route.method =='middle'){
                    //如果是中间件的话再看路径 是否匹配
                    if(route.path =='/'||pathname.startsWith(route.path+'/')||pathname == route.path){
                        //再看看是不是错误处理中间件
                        if(route.handler.length == 4){
                            route.handler(err,req,res,next);
                        }else{
                            next(err)
                        }

                    }else{
                        next(err);
                    }
                }else{
                    next(err);
                }
            }else{
                if(route.method == 'middle'){//中间件
                    //只要请求路径是以此中间件的路径开头就可以
                    //  1。/    2。以路径/开头  3。完全相等
                    if(route.path =='/'||pathname.startsWith(route.path+'/')||pathname == route.path){
                        route.handler(req,res,next);
                    }else{
                        next();
                    }
                }else{//路由
                    if(route.paramsNames){ //意味着有路径 参数
                        let matchers = pathname.match(route.path);
                        //matchers = [匹配结果，分组]
                        //matchers = ['user/xxx/9' , 'xxx','9',index: 1, input: '/user/xxx/9']
                        if(matchers){
                            //paramsNames
                            let params = {};
                            for(let i=0; i<route.paramsNames.length;i++){
                                params[route.paramsNames[i]] = matchers[i+1]
                            }
                            req.params = params;
                            //paramsHandlers
                            for(let j=0; j<route.paramsNames.length; j++){
                                let name = route.paramsNames[j]
                                let handler = app.paramsHandlers[name];
                                if(handler){
                                    handler(req,res,()=>route.handler(req,res),req.params[name]);
                                }
                            }
                        }else{
                            next();
                        }
                    }else{
                        if((route.method == req.method.toLowerCase()
                            ||route.method == 'all')
                            &&(route.path == pathname
                                ||route.path == '*')){
                            // console.log(route)
                            return route.handler(req,res);
                        }else{
                            next();
                        }
                    }
                }
            }
        }
        next();
        //当请求来了，匹配app.routes 来处理
        // for(let i=0; i<app.routes.length; i++){
        //     let route = app.routes[i];
        //     //匹配条件 有两个
        //     //路由方法名 == 请求方法名
        //     if((route.method == req.method.toLowerCase()
        //         ||route.method == 'all')
        //         &&(route.path == pathname
        //     ||route.path == '*')){
        //         console.log(route)
        //         return route.handler(req,res);
        //     }
        // }

    };
    app.listen = function(){
        let server = http.createServer(app);
        server.listen.apply(server,arguments)
    };
    app.paramHandlers = {}
;    app.param = function(name,handler){
        app.paramHandlers[name] = handler;
    }
    //此数组用来保存路由规则
    app.routes = [];
    //所有methods 方法
    http.METHODS.forEach(function(method){
        method = method.toLowerCase();
        app[method] = function(path,handler){//路径  回调函数
            //向数组里放置路由对象
            //一条路由规则有三个参数
            //请求方法，路径，处理函数
            /*app.routes.push({
                method,
                path,
                handler
            });*/
            const layer = {method,path,handler};
            if(path.includes(':')){
                //如果路径里面包含':' 则需要处理
                let paramsNames = [];
                //1.把原来的路径转成正则表达式
                //2.提取出变量名
                //第一个匹配的参数是：name
                //第二个匹配的参数是：age
                path.replace(/:([^\/]+)/g,function(){
                    //name age 都填充到paramsNames 内部
                    paramsNames.push(arguments[1]);
                    return '([^\\/]+)';
                });
                layer.path = new RegExp(path) ;//路径变成了正则表达式
                layer.paramsNames = paramsNames; //变量名的数组
                //  path 变成了 /uesr/([^\/]+)/([^\/]+)

            }
            //向数组时放置路由对象
            app.routes.push(layer);
        };
    })
    /*
    //get 就是代表HTTP的GET的请求
    app.get = function(path,handler){//路径  回调函数
        //向数组里放置路由对象
        //一条路由规则有三个参数
        //请求方法，路径，处理函数
        app.routes.push({
            method:'get',
            path,
            handler
        });
    };
     */
    //all方法可以匹配所有的HTTP 请求方法
    app.all = function(path,handler){
        //向数组里放置路由对象
        app.routes.push({
            method:'all',
            path,
            handler
        })
    }
    //添加一个中间件
    app.use = function(path,handler){
        if(typeof handler != 'function'){
            handler = path ;
            path = "/";
        }
        app.routes.push({
            method:'middle',
            path,
            handler
        })
    }
    //系统内置中间件，用来为请求和响应对象添加一些方法和属性
    app.use(function(req,res,next){
       const urlObj = url.parse(req.url,true) ;
       req.query = urlObj.query;
       req.path = urlObj.pathname;
       req.hostname = req.headers['host'].split(':')[0];
       next();
    });
    return app;
}
module.exports = createApplication;