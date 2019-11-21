/**
 * 1.控制台
 *  - 在Node.js中，使用console 对象代表控制台(在操作系统中表现为一个操作系统指定的字符界面，比如Window中的命令提示窗口)
 *     //标准输出流
 *     - console.log        输出信息
 *     - console.info       输出信息(同log完全相同)
 *
 *     //错误输出流
 *     - console.error      输出错误
 *     - console.warn       输出警告
 *
 *     - console.dir        列出对象的解构
 *     - console.time      （开始）统计两段代码之间执行时间
 *     - console.timeEnd   （结束）
 *     - console.trace      跟踪当前代码的调用栈
 *     - console.assert     测试(单元测试、集成测试等)
 *
 *
 **/

//把标准输出流输出到文件   1
console.log(1);
console.info(1);

//错误输出 2
//把错误输出2重定向到标准输出1中
//node 3.console.js 1> a.log 2>&1  (cmd重定向)
console.warn(2);
console.error(2);

//用来统计两段代码之间执行时间
console.time('cost');
let i=0;
while(i++ < 100000){

}
console.timeEnd('cost');//输出时间差

//高手进阶的非常重要标志就写代码会有完善的测试
//包括单元测试 集成测试 持续继承 TDD：测试驱动开发 BDD：行为驱动开发
//以后会让大家造轮子，写开源项目，写项目的时候要严格按照开源的规范来做，其中一个就是要有严格的单元测试
//CMMI5 级水平
//断言
//如果表达式为真的话就什么也不发生
//如果表达式结果为假的话会报错   nagios catty 监控服务器的内存 cpu 占有 服务是否正常...
console.assert(1 == 1,'错误');
function sum(a,b){
    return a+b;
}
//如果修改了sum 让a+b !=3 则报错
console.assert(sum(1,2)==3,'报错');

let a = {name:'xxx',home:{name:'beijing'}};
//可以列出对象的解构
console.dir(a);
// console.log(global);

//跟踪当前代码的调用栈
console.trace();
/*
   - 程序执行从上往下执行
   - 栈是先进后出

Trace
    at Object.<anonymous> (/Users/tommy/Desktop/directory/node/4.node/3.控制台.js:65:9)
    at Module._compile (internal/modules/cjs/loader.js:956:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:973:10)
    at Module.load (internal/modules/cjs/loader.js:812:32)
    at Function.Module._load (internal/modules/cjs/loader.js:724:14)
    at Function.Module.runMain (internal/modules/cjs/loader.js:1025:10)
    at internal/main/run_main_module.js:17:11
 */
