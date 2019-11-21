//内置中间件  static 静态文件中间件
let express = require('express');
let path = require('path');
let app = express();
//此中间件会拦截客户端的请求，然后去静态文件目录下面找一下有没有对应的文件，如果有则返回给客户端，如果没有则next往下面走
function static(root,options = {}){

}
//static(root,[options])   root根目录，静态文件放置位置
app.use(express.static(path.join(__dirname,'public')));
//客户端会访问/user   这个不是一个静态文件，则直接next进入
app.get('/user',function(req,res){
    res.end('user')
})

app.listen(8080);