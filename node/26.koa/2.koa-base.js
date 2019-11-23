const Koa = require('koa');
const app = new Koa();
const port = 9300;

app.use(async(ctx,next)=>{
    ctx.body = 'hello Koa';
    next();
});
app.use(async(ctx,next)=>{
    ctx.body = 'hello Koa2';
});

app.listen(port,()=>{
    console.log(`${port} listen`)
});