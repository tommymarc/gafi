//fork exec execFile 他们其实都是基于spawn的改进方法
let {fork } = require('child_process');
/**
 * fork 可以直接运行一个node 模块
 * silent 可以快速 设置stdio 内的属性 ignore
 */
// let {spawn} =require('child_process')
let path = require('path');
/*
function fork(modulepath,args,options){
    let {silent} = options;
    let opts = Object.assign({},options);
    if(silent){
        opts.stdio = ['ignore','ignore','ignore'];
    }else{
        opts.stdio = [process.stdin,process.stdout,process.stderr];
    }
    spawn('node',[modulepath,...args],options);
}
 */
let child = fork('fork.js',['a'],{
    cwd:path.join(__dirname,'test1'),
    silent:false
});
//安静模式
//silent 为true  则不能输出
//silent 为false 则输出

child.on('message',function(data){
    console.log( data)
});
child.send('hello')
// child.send({name:'a'})