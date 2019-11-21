const express =require('./express');
const app = express();
//最重要的是路由功能  根据不同的方法和不同的路径 返回不同的内容
//定义路由规则

app.get('/hello',function(req,res){
    res.end('hello');
});
//有时候希望只匹配路径，不管什么方法都能处理匹配 app.all
app.all('/world',function(req,res){
    res.end('world');
});
// * 表示所有的路径
app.all('*',function(req,res){
    res.end('*')
});
/*
app.post('/world',function(req,res){
    res.end('world');
});
app.put('/world',function(req,res){
    res.end('world');
});
 */

//启动一个8080服务器
app.listen(8080,function(){
    console.log('server started at 8080')
});