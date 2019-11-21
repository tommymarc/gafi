let load = require('./load');//相对路径
// let load1 = require('/Users/tommy/Desktop/node_modules');

//let load3 = require('load3');
//先找当前目录下的
//load3 -> load3.js -> load3.json -> load3.mode ->load3文件夹


//------------------------------
let load2 = require('load');
//当前模块的查找路径  全局的模块路径
//会找到module.paths global module
console.log(module.paths);
/**
 *【
 '/Users/tommy/Desktop/node_modules',
 '/Users/tommy/node_modules',
 '/Users/node_modules',
 '/node_modules'
 ]

 环境变量中的 NODE_PATH 指向的目录
 **/