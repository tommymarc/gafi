/**
 * nextTick() 不是当前执行的tack栈，也不是异步回调事件队列
 * 是一个单独的tack栈
 * @constructor
 */

function Clock(){
    this.lestener;

    // this.listener();// 此时已经提前执行了，并未绑定function，因此会报错
    process.nextTick(()=>{//把调用放在tack队列里面
        this.listener();
    })
}
Clock.prototype.add = function(listener){
    this.listener = listener;
}

let c = new Clock();
c.add(()=>{
    console.log('ok');
})
