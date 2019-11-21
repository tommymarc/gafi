//构造函数的参数是一个异步任务
function  Promise(task){
    let that = this; //缓存this ，把that绑定成 Promise 实例
    // 默认状态为pending
    that.status = 'pending';
    //此变量里放着此promise 的结果
    that.value = undefined;
    //存放着所有成功的回调函数
    that.onResolvedCallbacks = [];
    //存放着所有失败的回调函数
    that.onRejectedCallbacks = [];
    //调用此方法可以把promise变成成功态
    //resolve 的时候把挣到的钱存进去
    function resolve(value){
        if(that.status == 'pending'){
            that.status = 'fulfilled';
            that.value = value;
            that.onResolvedCallbacks.forEach(item=>item(that.value));
        }
    }
    //调用此方法可以把promise变成失败态
    function reject(reason){
        //如果当前状态是初始态，则转成失败态

        if(that.status == 'pending'){
            that.status = 'rejected';
            that.value = reason;
            that.onRejectedCallbacks.forEach(item=>item(that.value));

        }
    }
    //立刻执行传入的任务
    try{
        task(resolve,reject);
    }catch(e){
        reject(e);
    }
}

//onFulfilled 成功的回调，onRejected失败的回调
Promise.prototype.then = function(onFulfilled,onRejected){
    let that = this;
    //如果value值已经满足了成功态，失败态，函数直接回调此value值
    if(that.status == 'fulfilled'){
        onFulfilled(that.value);
    }
    if(that.status == 'rejected'){
        onRejected(that.value);
    }
    if(that.status == 'pending'){
        that.onResolvedCallbacks.push(onFulfilled);
        that.onRejectedCallbacks.push(onRejected);
    }

}


module.exports = Promise;