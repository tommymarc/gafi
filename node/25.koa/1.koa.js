const Koa = require('koa');
const app = new Koa();
//Koa推荐  async 异步执行
//ctx context 是koa提供一个对象，包含一些常见的方法和属性
app.use(async function(ctx,next){
    console.log(ctx.url)
    console.log(1);
    await next();
    console.log(2);
});
app.use(async function(ctx,next){
    console.log('a');
})

app.listen(8080);