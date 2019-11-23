//请求体
const Koa = require('koa');
const querystring = require('querystring');
const app = new Koa();
//GET /user 返回一个空白  表单
//POST /user 表示提交  用户注册数据
app.use(async function(ctx,next){
    if(ctx.url == '/user' && ctx.method == 'GET'){
        ctx.set('Content-Type','text/html,charset=utf8')
        //返回响应体
        ctx.body = (
            `
                <form method = "POST">
                    <input type="text" name = "username">
                    <input type="submit">
                </form>
            `
        );
    }else{
        await next()
    }
});
app.use(async function(ctx,next){
    if(ctx.url == '/user' && ctx.method == 'POST'){
        /*let buffers = [];
        //解析请求体 舰艇请求对象的 data 事件
        ctx.req.on('data',function(data){
            buffers.push(data);
        });
        ctx.req.on('end',function(){ //buffer 返回给客户端
            let result = Buffer.concat(buffers);
            console.log(result.toString()); //username=123
            ctx.body = result;
        })*/
        ctx.body = await parse(ctx.req);
    }else{
        await next()
    }
});
//因为koa 是异步的，所以返回客户端的响应需要异步promise处理
function parse(req){
    return new Promise(function(resolve,reject){
        let buffers = [];
        //解析请求体 舰艇请求对象的 data 事件
        req.on('data',function(data){
            buffers.push(data);
        });
        req.on('end',function(){ //buffer 返回给客户端
            let result = Buffer.concat(buffers);
            resolve(querystring.parse(result.toString()));
        })
    })
}
app.listen(8080);