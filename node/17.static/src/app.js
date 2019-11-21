//要创建一个服务器
//创建一个server类，里面包含构造函数
let config = require('./config'); //配置
let http = require('http'); //服务器模块
let chalk = require('chalk'); //粉笔
let path = require('path'); //路径
let url = require('url');
let fs = require('fs');
let {promisify,inspect} = require('util'); //异步变成同步方法
let stat = promisify(fs.stat);
let readdir = promisify(fs.readdir);
let mime = require('mime');   //文件扩展类型 Content-Type header
let handlebars = require('handlebars');// 引用handlebars 模版
//编译模版，得到一个渲染的方法，然后传入实际数据 就可以得到渲染后的HTML
function list(){
    //想要拿到模版，就要读
    let tmpl = fs.readFileSync(path.resolve(__dirname,'template','list.html'),'utf8');
    return handlebars.compile(tmpl);
}
/*
  这是一个在控制台输出的模块，可输出可不输出，取决于后面参数
  名称特点有两部分组成，第一部分是项目名，第二部分是模块名
 debug 返回一个函数，('static:app')
 每个debug实例 都有一个名字，是否让控制台打印取决于环境变量中debug的值是否等于 static:app
*/
//在代码内部是可以读到环境变了的值，当然也可以写入环境变量的值
//console.log(process.env);   //env是变量，里面存放所有环境变量
//process.env.DEBUG = 'static:*'; //设置所有DEBUG 的值
// let debug = require('debug')('static:app');  //调试
class Server{
    constructor(argv){
        this.list = list();
        this.config = Object.assign({}, this.config, argv);
    }
    start(){
        let server =http.createServer();//创建服务器
        //request.bind(this) 绑定this,让此方法永远指向 Server实例
        server.on('request',this.request.bind(this));//当客户端向服务器发送数据时，会触发服务器 request 事件
        server.listen( this.config.port,()=>{//监听端口号
            let url = `http://${ this.config.host}:${ this.config.port}`;
            console.log(`server started at ${chalk.blue(url)}`); //chalk.blue() 用蓝色写一副字符串
            // debug(`server started at ${chalk.blue(url)}`); //chalk.blue() 用蓝色写一副字符串
        })

    }
    //静态文件服务器
    async request(req,res){//req 请求  res 响应
        //先拿到客户端想要访问的文件或文件夹路径
        let {pathname} = url.parse(req.url);
        let filepath = path.join( this.config.root,pathname);
        try{
            let statObj = await stat(filepath);
            if(statObj.isDirectory()){//如果是目录的话，应该显示目录下面的文件列表
                let files = await readdir(filepath);//读取目录下的文件列表
                //files字符串数组，只有文件名，没有路径,需要用map映射
                files = files.map(file=>({
                    //把每个字符串变成对象
                    name: file,
                    url: path.join(pathname,file) //当前路径

                }));
                let html = this.list({
                    title: pathname,
                    files
                });
                res.setHeader('Content-Type','text/html');
                res.end(html);
            }else{//如果是文件，显示文件类容
                this.sendFile(req,res,filepath,statObj);
            }
        }catch(e){
            // debug(inspect(e));// inspect()把一个对象转成字符串
            this.sendError(req,res);
        }
    }
    //读文件内容 返回给客户端
    sendFile(req,res,filepath,statObj){
        //默认200
        //通过文件后缀，拿到文件类型，通过文件类型拿到contentType
        res.setHeader('Content-Type',mime.getType(filepath)); // .jpg
        //把文件路径变成可读流，pipe到res里面
        fs.createReadStream(filepath).pipe(res);
    }
    sendError(req,res){
        res.statusCode = 500; //服务器端错误
        res.end(`there is something wrong in the server! please try later!`);
    }
}
let server = new Server(); //new 一个函数
server.start(); //启动服务

module.exports = Server;