/**
 *  在node.js里通过require方法加载其他模块
 *  这个加载是同步的
 *  1. 找到这个文件
 *  2. 读取此文件的模块内容
 *  3. 把它封装在一个函数里立刻执行
 *  4. 执行后把模块的module.exports对象赋给school
 */
/**
 * 因为模块实现缓存，当第一次加载一个模块之后，会缓存这个模块的exports对象，
 * 以后如果再次加载这个模块的话，则直接从缓存中取，不需要再次加载了
 * 缓存的key 是什么？
 * 文件的绝对路径，其他模块可直接运用缓存进行加载
 */
console.log(require);
/* require内的方法：
resolve
extensions
cache
 */
//当你想知道一个模块的绝对路径的时候，但又不想真正加载它的时候，用resolve
console.log(require.resolve('./school')); //指向知道模块的路径，但又不想加载这个模块
//main 主要的，指的就是入口模块
console.log(require.main);// useschool
//extensions 扩展
/*
在node里模块的类型有三种
    1. js模块     //require 加载 ，拿到内容，放在方法执行，得到执行结果
    //let user = require('./user')
    2. json模块   //拿到json文件，读取文件内容，JSON.parse 转成对象返回
    //let user = require('./user.json')
    3. node c++扩展二进制模块
    //这属于二进制模块
    当require加载一个模块的时候，会先找user 如果找不到，会再找user.js ； 如果找不到，找user.json ； 如果还找不到，找user.node
 */
console.log(require.extensions);




console.log(module);
/*
id: '.',   //模块ID  入口模块的ID永远为 '.'
  path: '/Users/tommy/Desktop/directory/node/5.module',
  //导出对象，默认是一个空对象
  exports: {},
  //父模块  此模块是由那个模块加载的
  parent: null,
  //当前模块的绝对路径
  filename: '/Users/tommy/Desktop/directory/node/5.module/useschool.js',
  //是否加载完成
  loaded: false,
  //此模块加载了什么模块
  children: [],
  //paths 数组 第三方模块的查找路径
  paths: [
    '/Users/tommy/Desktop/directory/node/5.module/node_modules',
    '/Users/tommy/Desktop/directory/node/node_modules',
    '/Users/tommy/Desktop/directory/node_modules',
    '/Users/tommy/Desktop/node_modules',
    '/Users/tommy/node_modules',
    '/Users/node_modules',
    '/node_modules'
  ]
 */

let school = require('./school');
//封装在函数里面
/*
!function(exports,require,module,__filename,__dirname){
    let name = 'xxx';
    let age  = 9;

    module.exports = {name,age}

    return module.exports;
}()
 */

/*
源码
var dirname = path.dirname(filename);
var require = internalModule.makeRequireFunction.call(this);
var args = [this.exports,require,this,filename,dirname];
var depth = internalModule.requireDepth;
if(depth === 0) stat.cache = new Map();
var result = compiledWrapper.apply(this.exports,args);
if(depth === 0) stat.cache = null;
return result;

dirname 取得当前模块文件的所在目录的绝对路径
//1.当前模块的导出对象,  2.require方法， 3.当前模块,  4.当前文件的绝对路径，5.当前文件夹的绝对路径
var args = [this.exports,require,this,filename,dirname]
在模块内部  this.exports 等于当前模块导出对象，就等于this
 */