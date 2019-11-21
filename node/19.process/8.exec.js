/**
 * exec 同步执行一个shell 命令
*/
let {exec} =require('child_process');
let path =require('path');
//用于使用 shell 执行命令
//killSignal 我们可以通过kill命令行向子进程 发射信号
let p1 = exec('node test1.js a b c ',{encoding:'utf8',cwd: path.join(__dirname,'test2')},function(err,stdout,stdin){
    // console.log(arguments);
    console.log(err)
    console.log(stdout);
});
//其实会向子进程发射一个信号  默认SIGTERM
//kill 并非一定要杀死子进程，有时候就是吓唬一下
//结束子进程 p1
// p1.kill();