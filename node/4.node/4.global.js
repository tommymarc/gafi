/**
 * 全局作用域
 *  - 全局作用域(global)可以定义一些不需要通过任何模块的加载即可使用的变量、函数或类
 *  - 定义全局变量时变量会成为global的属性
 *  - 永远不要不使用var关键字定义变量，以免污染全局作用域
 *  - setTimeout clearTimeout
 *  - setInterval clearInterval
 *  - unref 和 ref
 *
 * windows 里也有全局对象，但是不能直接访问，我们在浏览器里访问global是通过window实现的
 *  1. global的变量都是全局变量
 *  2. 所有的全局变量都是global的属性
 *  console
 *  process         当前进程
 *  chdir           改变当前路径
 *  cwd             当前路径
 *  memoryUsage     查看使用量
 *  nextTick
 *  stdout stderr stdin
 *  Buffer
 *  clearImmediate clearInterval clearTimeout
 *  setImmediate setInterval setTimeout
 **/
/*
let test = function(){
    console.log('callback');
}
let timer = setInterval(test,1000);
timer.unref();
setTimeout(function(){
    timer.ref();
},3000);
// clearInterval(timer);
 */

//argv 如何写一个vue-cli 脚手架
//chdir  change directory 改变当前的工作目录
//cwd    current working directory   当前的工作目录
console.log(process.cwd());//查看目录
process.chdir('..')//切换到上级目录
console.log(process.cwd());//查看目录

/*
{ V8引擎最大使用内存量是1.7个G
  rss: 17895424,        常驻内存
  heapTotal: 4472832,   堆内存的总申请量
  heapUsed: 2365448,    已经使用的量
  external: 798770      外部内存的使用量
}
 */
console.log(process.memoryUsage());


