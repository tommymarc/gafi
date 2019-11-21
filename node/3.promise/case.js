let MyPromise = require('./Promise');
let p1 = new MyPromise(function(resolve,reject){
    setTimeout(function(){
        let num = Math.random();
        if(num< .5){
            resolve(num);
        }else{
            reject('失败');
        }
    })
});
p1.then(function(data){
    console.log(data);
    throw Error('成功回调出错了')
},function(err){
    console.log(err);
}).then(function(data){
    console.log(data);
},function(reason){
    console.log(reason);
});

/*
 //这个叫值的穿透
let p2 = p1.then();  //p1.then()里面没有任何逻辑，则值直接穿透到p2
//value => value 相当于
//let p2 = p1.then(function(data){return data})
p2.then(function(data){
    console.log(data);
},function(reason){
    console.log(reason);
});
 */