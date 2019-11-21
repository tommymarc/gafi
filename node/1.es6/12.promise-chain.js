//let Promise = require('./Promise');
let p1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject(100);
    },1000);
});
//成功回调后的值会被用来resolve 当前的promise
let p2 = p1.then(function(data){
    return data+100;
},function(err){
    console.log(err);
    return err+100; //哪怕是失败了，只要return回调后的值还是会被resolve
    // throw new Error(err+100); //p2失败 Error: 200
});
p2.then(function(data){
    console.log('p2成功',data);
},function(err){
    console.log('p2失败',err);
});

/**
 * promise 嵌套
 **/
let p3 = p1.then(function(data){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve(new Promise(function(){
                setTimeout(function(){
                    resolve(data+100);
                },1000);
            }))
        },1000);
    })
});