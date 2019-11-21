/**
 *1 异步回调
 * 1.1 回调地狱： 在需要多个操作的时候，会导致多个回调函数嵌套，导致代码不够直观，就是回调地狱
 * 1.2 并行结果： 如果几个异步操作之间并没有前后顺序之分，但需要等多个异步操作都完成后才能执行后续的任务，无法实现并行节约时间
 *
 **/
/*
$.ajax('url1',success(){//调用3个接口，不断嵌套
    $.ajax('url2',success(){
        $.ajax('url3',success){

        }
    })
})
 */
/**
 * 2 Promise
 * Promise是一个类，可以创建实例
 * 代表 承诺，
 * 何时使用： 一般是异步任务，需要很长时间执行的任务
 * 异步：  指可能比较长时间才能有结果的才做，例如网络请求，读取本地文件等
 *
 *
 * Promise表示一个异步操作的最终结果，与Promise最主要的交互方法是通过将函数传入它的 then 方法从而获取得Promise 最终的值(resolve) 或 Promise最终拒绝(reject)的原因
 *
 *  2.1 术语
 *      promose 是一个包含了兼容promise规范then 方法的对象或函数
 *      thenable 是一个包含了then 方法的对象或函数
 *      value  是任何Javescript值 。 (包括undefined , thenable, promise等)
 *      exception 是由 throw 表达式跑出来的值. （异常）
 *      reason  是一个用于描述Promise 被拒绝原因的值
 *
 *  2.2 Promise 状态
 *      一个Promise 必须处在其中之一的状态： pending， fulfilled 或 rejected。
 *      *如果是pending 状态(初始态)，则promise：
 *          - 可以转换到fulfilled 或 rejected 状态。
 *      *如果是fulfilled 状态(成功态)，则promise：
 *          - 不能转换成任何其他状态
 *          - 必须有一个值(value)，且这个值不能被改变
 *      *如果是rejected 状态(失败态)，则promise：
 *          - 不能转换成任何其他状态
 *          - 必须有一个原因(reason)，且这个值不能被改变
 *      *"值不能被改变" 指的是其identity不能被改变，而不是指其成员内容不能被改变
 *
 *  2.3 then 方法
 *      一个Promise必须提供一个then方法来获取其值或者原因。
 *      Promise的then方法接受两个参数：
 *      promise.then(onFulfilled,onRejected)
 *          1.onFulfilled 和 onRejected 都是可选参数：
 *              1.如果onFulfilled 不是一个函数，则忽略之。
 *              2.如果onRejected不是一个函数，则忽略之
 *          2.如果onFulfilled是一个函数：
 *              1.它必须在promise fulfilled后调用，且promise的value为其第一个参数。
 *              2.它不能在promise fulfilled前调用
 *          3.如果onRejected是一个函数
 *              1.它必须在promise rejected后调用，且promise的reason为其第一个参数。
 *              2.它不能在promise rejected前调用。
 *              3.不能被多次调用
 *         4.onFulfilled 和 onRejected 只允许在execution context 栈仅包含平台代码时运行
 *         5.onFulfilled 和 onRejected 必须被当作函数调用(i.e.即函数体内的 this 为 undefined)
 *         6.对于一个promise，它的then 方法可以调用多次.
 *              1.当promise fulfilled后，所有onFulfilled 都必须按照其注册顺序执行。
 *              2.当promise rejected后，所有onRejected 都必须按照其注册顺序执行。
 *         7.then 必须返回一个promise
 *              promise2 = promise1.then(onFulfilled, onRejected);
 *
 *              1.如果onFulfilled 或 onRejected 返回了值 x，则执行Promise 解析流程[[Resolve]](promise2, x)
 *              2.如果onFulfilled 或 onRejected 抛出了异常 e，则promise2应当以 e 为reason 被拒绝。
 *              3.如果onFulfilled 不是一个函数且promise1 已经fulfilled，则promise2 必须以promise1的值fulfilled。
 *              4.如果onRejected 不是一个函数且promise1 已经rejected， 则promise2 必须以相同的reason 被拒绝。
 *
 *  2.4 Promise 解析过程
 *      Promise解析过程 是以一个promise 和一个值作为参数的抽象过程，可表示为[[Resolve]](promise,x) 过程如下
 *          1.如果promise 和 x 指向相同的值，使用 TypeError 作为原因将 promise拒绝。
 *          2.如果x 是一个promise ， 采用其状态：
 *              1.如果x 是pending 状态， promise 必须保持pending 走到x fulfilled 或rejected。
 *              2.如果x 是fulfilled 状态，将x 的值用于fulfill promise。
 *              3.如果x 是rejected 状态，将x 的原因用于reject promise ..
 *          3.如果x 是一个对象或一个函数：
 *                  1.将then 赋为x.then.
 *                  2.如果在取x.then 值时抛出了异常，则以这个异常作为原因将promise 拒绝。
 *                  3.如果then 是一个函数，以x 为this 调用 then 函数，且第一个参数是 resolvePromise，第二个参数是rejectPrmose，且：
 *                      1.当resolvePromose 被以y 为参数调用，执行[[Resolve]](promise,y)
 *                      2.当rejectPromise 被以r 为参数调用，则以r 为原因将promise 拒绝
 *                      3.如果resolvePromise 和 rejectPromise 都被调用了，或者被调用了多次，则只第一次有效，后面的忽略。
 *                      4.如果在调用then 时抛出了异常，则：
 *                          1.如果resolvePromise 或rejectPromise 已经被调用了，则忽略它
 *                          2.否则，以e 为reason 将 promise 拒绝。
 *                  4.如果then 不是一个函数，则以x 为值fulfill promise。
 *          4.如果x 不是对象也不是函数，则以x 为值 fulfill promise。
 *
 *
 **/
// 1 resolve 成功  2 reject 拒绝
let Promise = require('./Promise'); //引入模块
let p1 = new Promise(function(resolve,reject){//创建一个Promise实例
    //同步函数
    //resolve(100000);
    //reject(100000);
    //pending 异步函数
    setTimeout(function(){
        let num = Math.random(); //生成一个随机数
        if(num>.5){
            //如果这个promise 成功了 会调用成功的回调 fulfilled
            resolve('大成功')
        }else{
            //如果这个promise 失败了 会调用失败的回调 rejected
            reject('小失败')
        }
    },2000);
});
p1.then(function(value){//成功回调函数 resolve
    console.log('成功=',value);
},function(reason){//失败回调函数 reject
    console.log('失败=',reason);
});

