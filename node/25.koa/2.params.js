const Koa = require('koa');
const app = new Koa();
//如何获取koa的请求参数
//request response  koa自己封装的对象
//req  res  原始的请求响应对象
app.use(async function(ctx,next){
    console.log(ctx.method);
    console.log(ctx.url);
    console.log(ctx.headers);
    //querystring 查询字符串
    console.log(ctx.querystring);//查询字符串
    //query     查询对象
    console.log(ctx.query);//查询对象
    /**
     * 1.字符串 Buffer
     * 2.对象
     * 3.流
     **/
    //res.end res.write
    //ctx.res.write('hello') 在koa里不能直接通过 这种写入响应体
    // ctx.response.body = ctx.headers
    ctx.body = ctx.headers;

})

app.listen(8080)