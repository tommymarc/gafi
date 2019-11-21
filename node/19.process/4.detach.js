/**
 * detach 默认情况下父进程 要等待所有子进程 全部完成退出后才能退出
 * 但是如果为子进程设置detach = true，则此子进程就可以脱离父进程单独存在了
 *
 **/
let {spawn} = require('child_process');
let fs = require('fs');
let path = require('path');
let fd = fs.openSync(path.join(__dirname,'msg.txt'),'w',0o666);
let p1 = spawn('node',['test4.js'],{
    stdin:['ignore',fd,'ignore'],
    cwd: path.join(__dirname,'test1'),
    detached:true
});
p1.on('error',function(err){
    console.log(err);
});
//unref 的意思是让父进程先退出，子进程继续运行
p1.unref();

