/**
 * spawn 产卵 linux里面一样
 *
 **/
let {spawn} = require('child_process');
let path = require('path');
//默认情况下，子进程的stdin,stdout,stderr导向了ChildProcess这个对象的child.stdin,child.stdout,child.stderr流,
//这和设置stdio为['pipe', 'pipe', 'pipe']是一样的
let p1 = spawn('node',['test1.js','a'],{
    cwd: path.join(__dirname,'test1'),
    std:[process.stdin,process.stdout,'pipe']
});
let p2 = spawn('node', ['test2.js'], {
    cwd: path.join(__dirname, 'test3'),
    stdio: ['pipe','pipe','pipe']
});
let p3 = spawn('node',['test3.js','a'],{
    cwd: path.join(__dirname,'test1'),
    // std:[process.stdin,process.stdout,'pipe']
    std:['ipc','process.stdout','ignore']
});
p3.on('message',function(msg){
    console.log(msg)
})
// ipc 则看父子进程之间通过消息进行通信
p3.send('hello');
/**

 一旦指定//监听test1.js脚本子进程对象的标准输出的data事件，把数据写给p2了pipe，则以为这可以在父进程里得到 p1.stdout 得到的子进程的标准输出
 p1.stdout.on('data',function(data{
     console.log(data.toString());
     p2.stdin.write(data);
 }))
 */
//监听test1.js脚本子进程对象的标准输出的data事件，把数据写给p2
//每个进程 都会有标准输入流 标准输出流 错误输出流 当这些流关闭的时候会触发close事件
p1.on('close',function(){
    console.log('子进程1关闭')
});
//当这个进程退出的时候会触发exit 事件
p1.on('exit',function(){
    console.log('子进程1退出')
});
p1.on('error',function(err){
    console.log('子进程1开启失败'+err)
})
