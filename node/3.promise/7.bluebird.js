/**
 * bluebird 是世界上最快的promise库
 * 它能把任意的通过回调函数实现的异步API换成同步的promiseapi
 */
let Promise = require('bluebird');
// let readFile = require('fs').readFile;
let fs = reuire('fs'); //fs 里面对应的都是函数方法

/**
 * function promisifyAll(obj){
 *    for(let key in obj){ // 对每个方法添加一个新的方法 Async
 *        if(obj.hasOwnProperty(key) && typeof obj[key] == 'function'){
 *            obj[key + 'Async'] = Promise.promisify(obj[key])
 *        }
 *    }
 * }
 */
//它会遍历对象上面的所有方法，复制出来，然后对每个方法添加一个新的方法 Async
Promise.promisifyAll(fs);
fs.readFileAsync('./1.txt','utf8').then(data=>console.log(data))
// console.log(fs);


//可以把一个普通的异步方法转成返回promise的方法
//promisify 把readFile传入到fn，fn有三个参数 filename utf8 callback
/**
function promisify(fn){
    return function(...args){  //拿到返回的参数
        return new Promise(function(resolve,reject){
           fn.apply(null,[...args,function(err,data){ //function 模拟一个callback 放进去
               err?reject(err):resolve(data);
           }]);//传数组
        });
    }
}
 **/
// 会返回一个新的函数
let readFileSync = Promise.promisify(readFile);
readFileSync('./1.txt','utf8').then(function(data){
    console.log(data);
});
