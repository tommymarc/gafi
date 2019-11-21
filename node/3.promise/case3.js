let MyPromise = require('./Promise');
let Q = require('q');

//自己编写的promise
let p1 = new MyPromise(function(resolve,reject){
    resolve(100);
})

//es6的promise
let p2 = p1.then(function(data){ //原声的promise
    return new Promise(function(resolve,reject){
        resolve(data + 100);
    })
});

//q 的promise
let p3 = p2.then(function(data){
    let defer = Q.defer();
    defer.resolve(data + 100);
    return defer.promise;
    /*
    return Q.all[Promise.resolve(data+100),Promise.reject(404)];
     */
});
p3.then(function(data){
    console.log(data);
},function(err){
    console.log(err);
});

//所有的promise 实现的方式不一样，但是都是相同的规范
//所以互相都可以互相调用


