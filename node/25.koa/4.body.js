const Koa = require('koa');
const path = require('path');
//可以把一个generator中间件转成一个koa2的中间键
//koa deprecated Support for generators will be removed in v3.
const convert = require('koa-convert');
const app = new Koa();
//bodyParser能够拿到对象数据，但是不能拿到文件
// const bodyParser = require('koa-bodyparser');
const bodyParser = require('koa-better-body');
//需要指定参数
// 上传文件  指定上传的目录
app.use(convert(bodyParser({
    uploadDir:path.join(__dirname,'uploads')
})));
//如果要上传文件的话，express要用multer中间件， koa里面要用koa-better-body
//如果说要在表单里上传文件的话，就需要给表单增加 enctype="multipart/form-data"
app.use(async function(ctx,next){
    if(ctx.url == '/user' && ctx.method == 'GET'){
        ctx.set('Content-Type','text/html,charset=utf8')
        //返回响应体
        ctx.body = (
            `
                <form method = "POST" enctype="multipart/form-data">
                    <input type="text" name = "username">
                    <input type="file" name = "avatar">
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
        //当使用bodyParser中间件之后，当请求到来的时候，会解析请求体赋给ctx.request.body
        // ctx.body = ctx.request.body;
        //fields 是字段的意思，包括普通字段和文件字段
        ctx.body = ctx.request.fields;
    }else{
        await next()
    }
});
app.listen(8080);