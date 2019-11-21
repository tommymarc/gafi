//配置文件
//导出一个配置对象
let path = require('path')
module.exports = {//配置
    host:'locahost',   //监听的主机
    port: 8080,    //端口号
    // root: process.cwd()   //静态文件root根目录
    root: path.resolve(__dirname,'..','public') //配置静态文件root根目录
}