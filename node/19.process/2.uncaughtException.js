/**
 *
 * 未被捕获的异常触发进程对象的 uncaughtException事件
 *
 * node 一般不是很健壮，因为是单线程，如果一个进程错误，整个进程都错了
 * 处理错误非常重要
 *
 * uncaughtException 专门用来捕获未处理的异常
 * 缺点：有可能引起内存泄漏等问题，捕获不到问题错误原因
 **/
setTimeout(function(){
    console.log('hello')
},3000);


// try{
//     nomethod();
// }catch(e){//捕获错误
//     console.error(e);
// };

//如果没有捕获错误，则打印uncaughtException
process.on('uncaughtException',function(){
    console.log('uncaughtException');
});

nomethod();