/**
 *  async/await 号称 异步的终极解决方案, 是最简单的
 *  但是其实它只是generator + promise 的语法糖
 **/

let fs = require('fs');
let co = require('co');
function readFile(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,'utf8',function(err,data){
            err?reject(err):resolve(data);
        })
    })
}

/**
 * 1.简洁
 * 2.有很好的语义
 * 3.可以很好的处理异步  throw error reutnr try catch
 * 现在koa2 里已经可以支持async/await
 * @returns {Promise<void>}
 */
//async 加在一个含有异步代码方法的函数头
//await 加在返回的promise前面
 async function read(){
     //await 后面必须跟promise
     let a = await readFile('./1.txt');
     console.log(a);
     let b = await readFile('./2.txt');
     console.log(b);
     let c = await readFile('./3.txt');
     console.log(c);
     return 'ok';
 }
// let r = read(); //read() 返回的是promise
// console.log(r);
/**
 * 如何拿到return的 'ok'？
 */
read().then(data=>{
    console.log(data);// ok
});

//async / await 是语法糖，内部还是用generator + promise 异步实现
/**
 * async函数的实现，就是将generator 函数和自动执行器，包装在一个函数里
 *
async function read(){
    let a = await readFile('/1.txt');
    let b = await readFile('2.txt');
    return a + '+' + b
}
//等同于
function read(){
    return co(function * (){//生成器
        let a = yield readFile('./1.txt');
        let b = yield readFile('./2.txt');
        return a + '+' + b;
    })
}
 */

function read(){
    return co(function *(){//生成器
        let a  = yield readFile('./1.txt');
        console.log(a);
        let b  = yield readFile('./2.txt');
        console.log(b);
        let c  = yield readFile('./3.txt');
        console.log(c);
        return 'ok';
    })
}
read().then(function(data){
    console.log(data);
})

/**
let Promise = require('bluebird');
let readFile = Promise.promisify(require('fs').readFile);
async function read(){
    //await 后面必须跟一个promise，
    let a = await readFile('./1.txt','utf8');
    console.log(a);
    let b = await readFile('./2.txt','uft8');
    console.log(b);
    let c = await readFile('./3.txt','utf8');
    console.log(c);
    return 'ok';
}
 */

