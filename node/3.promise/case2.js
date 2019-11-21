let Promise = require('./Promise')
let p1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        reject('p1失败');
    },1000);
});
let p2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve(200);
    },2000);
});
//Promise.all 会接收一个promise 数组，如果promise 全部完成了这个， promise才会成功。如果一个失败了，那么这个promise就整个失败了
//Promise.race 会接收一个promise数组，只要有一个成功了，则就成功，只要有一个失败了就失败

//同时异步请求多个数据的时候（请求模版、数据），会用all
console.time('cost');//统计一个时间的开始
console.time('cost2');//统计一个时间的开始

 Promise.all([p1,p2]).then(function(data){
    console.log(data); //[1,2]
    console.timeEnd('cost');//统计时间的结束
},function(err){
     console.log(err);
     console.timeEnd('cost')
 });


//当在一个不可靠的网络中（同时请求三个网络地址，，有一个请求下来即可）
//同时请求三个接口都不稳定，可以同时取三个接口，谁先回来用谁的
Promise.race([p1,p2]).then(function(data){
    console.log(data);
    console.timeEnd('cost2');
},function(err){
    console.log(err);
    console.timeEnd('cost2')
});
