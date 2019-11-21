//Promise 类，里面可以创建实例
const PENDING = 'pending'; //初始态
const FULFILLED = 'fulfilled'; //成功态
const REJECTED = 'rejected'; //失败态
function Promise(executor){  //  executor 执行器
    let self = this; //先缓存this(当前promise实例)
    self.status = PENDING; //设置状态
    //定义存放成功的回调的数组
    self.onResolvedCallbacks = [];
    //定义存放失败回调的数组
    self.onRejectedCallbacks = [];
    //当调用此方法的时候，如果promise状态为pending 的话，可以转成成功态
    //如果已经是成功态 或 失败态了，则什么都不做
    //2.1.1
    function resolve(value){
        if(value instanceof Promise){
            return value.then(resolve,reject)
        }
        if(self.status == PENDING){ //2.1.2
            //如果是初始态，则转成成功态
            self.status = FULFILLED;
            self.value = value;//成功后会得到一个值，这个值不能改
            //调用所有成功的回调
            self.onResolvedCallbacks.forEach(cb=>cb(self.value));
        }
    }
    function reject(reason){
        if(self.status == PENDING){ //2.1.3
            //如果是初始态，则转成失败态
            self.status = REJECTED;
            self.value = reason;   //失败的原因给了value
            self.onRejectedCallbacks.forEach(cb=>cb(self.value));
        }

    }
    try{
        //因为此函数执行可能异常，所以需要捕获，如果出错了，需要用 错误对象reject来检验
        executor(resolve,reject);
    }catch(e){
        //如果函数执行失败了，则用失败的原因reject这个promise
        reject(e)
    }

    function resolvePromise(promise2,x,resolve,reject){
        if(promise2 === x ){
            return reject(new TypeError('循环引用'))
        }
        let called = false; //promise2 是否已经resolve
    /*
        if(x instanceof Promise){
            if(x.status == PENDING){
                //如果x是pending状态，x promise状态未完成，必须等待x promise完成
                x.then(function(y){ // y 就是 x的值
                    resolvePromise(promise2,y,resolve,reject)
                },reject)
            }else{
                //如果x 已经成功 或 失败 之后
                x.then(resolve,reject)
            }
            //x 是一个thenable 对象或函数，只要有then 方法的对象
        }else
     */
            if(x != null && ((typeof x == 'object')||(typeof x == 'function'))){
            //当我们的promise 和别的promise 进行交互，编写这段代码的时候 尽量的考虑兼容性，允许别人编写
            try{
                let then = x.then;
                if(typeof then == 'function'){
                    //有些promise 会同时执行成功和失败的回调
                    then.call(x,function(y){//成功回调
                        //如果promise2 已经成功或失败了，则不会再处理了
                        if(called)return{};
                        called = true;
                        resolvePromise(promise2,y,resolve,reject)
                    },function(err){//失败回调
                        //如果promise2 已经成功或失败了，则不会再处理了
                        if(called)return{};
                        called = true;
                        reject(err);
                    });
                }else{
                    //如果到此的话x 不是一个thenable 对象，那直接把它当成值resolve promise2就可以了
                    resolve(x)
                }
            }catch(e){
                //如果promise2 已经成功或失败了，则不会再处理了
                if(called)return{};
                called = true;
                reject(e)
            }

        }else{
            //如果x是普通的值(字符串，数字..)，则用x 的值去resolve promise2
            resolve(x);
        }
    }
    //onFulfilled, onRejected 是用来接收Promise成功的值 或 失败的原因
    Promise.prototype.then = function(onFulfilled,onRejected){
        //如果成功和失败的回调没有传，则表示这个then没有任何逻辑，只会把值往后抛
        //2.2.1
        onFulfilled = typeof onFulfilled == 'function'?onFulfilled:value=>value;
        onRejected = typeof onRejected == 'function'?onRejected:reason=>{throw reason};
        //如果当前promise状态已经是成功态了，onFulfilled直接取值
        //2.2.2
        let  self = this;
        let promise2;
        //当promise 同步分支，直接resolve 就会直接进入
        if(self.status == FULFILLED){
            return promise2 = new Promise(function(resolve,reject){
                setTimeout(function(){
                    try{
                        let x = onFulfilled(self.value);
                        //如果传入的x 是promise,继续解析
                        // if(x instanceof Promise){}
                        //如果获取到了返回值x ，会走解析promise的过程
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        //如果执行成功的回调过程中出错了，用错误原因把promise2 reject
                        reject(e);
                    }
                });
            })
        }
        //当promise 同步分支，直接rejecct 就会直接进入
        if(self.status == REJECTED){
            return promise2 =new Promise(function(resolve,reject){
                setTimeout(function(){
                    try{
                        let x = onRejected(self.value);
                        //如果获取到了返回值x ，会走解析promise的过程
                        resolvePromise(promise2,x,resolve,reject)
                    }catch(e){
                        reject(e)
                    }
                });
            });
        }
        //只有promise 异步，才会进入
        if(self.status == PENDING){
            return promise2 = new Promise(function(resolve,reject){
                self.onResolvedCallbacks.push(function(){
                    setTimeout(function(){
                        try{
                            let x = onFulfilled(self.value);
                            //如果获取到了返回值x ，会走解析promise的过程
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            reject(e);
                        }
                    });
                });
                self.onRejectedCallbacks.push(function(){
                    setTimeout(function(){
                        try{
                            let x = onRejected(self.value);
                            //如果获取到了返回值x ，会走解析promise的过程
                            resolvePromise(promise2,x,resolve,reject)
                        }catch(e){
                            //如果执行过程中出错误了，用错误原因把promise2 reject
                            reject(e);
                        }
                    });
                });
            })
        }
    }
}

//catch原理就是只传失败的回调
Promise.prototype.catch = function(onReject){
    this.then(null,onRejected);
};
Promise.deferred = Promise.defer = function(){
    let defer ={};
    defer.promise = new Promise(function(resolve,reject){
        defer.resolve = resolve;
        defer.reject = reject;
    });
    return defer;
}


function gen(times,cb){
    let result = [],count = 0;
    return function(i,data){
        result[i] = data;
        if(++count == times){
            cb(result);
        }
    }
}
Promise.all = function(promises){
    return new Promise(function(resolve,reject){
        let done = gen(promises.length,resolve);
        for(let i=0; i<promises.length;i++){
            // promises[i].then(done.bind(null,i));
            promises[i].then(function(data){
                done(i,data);
            },reject)
        }
    })
};

Promise.race = function(promises){
    return new Promise(function(resolve,reject){
        for(let i=0;i<promises.length;i++){
            promises[i].then(resolve,reject);
        }
    })
}
module.exports = Promise;