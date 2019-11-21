//这个模块是用于实现promise，在angular.js里的promise 就是用 Q
//通过命令安装  npm i q
// let Q = require('q');
let Q ={
    defer(){ // defer 延迟的意思
        let success,error;
        return { //返回三个对象 resolve reject promise
            resolve(data){ //缓存返回的成功值 data
                success(data);
            },
            reject(err){   //缓存返回的失败值 err
                error(err);
            },
            promise:{ // promise 里面一个then()
                then(onFulfilled,onRejected){ //thenable 对象
                    success = onFulfilled;
                    error = onRejected;
                }
            }
        }
    }
}
let fs = require('fs');
function readFile(filename){
    let defer = Q.defer();
    fs.readFile(filename,'utf8',function(err,data){
        if(err) {
            defer.reject(err);
        }
        else{
            defer.resolve(data);
        }
    });
    return defer.promise;
}
readFile('1.txt').then(function(data){
    console.log(data);
});

//spread 数组 扩展的意思
let r = Q.spread([Promise.resolve(1),Promise.resolve(2)],function(a,b){
    return a + b;
})
r.then(data=>{
    console.log(data);
})