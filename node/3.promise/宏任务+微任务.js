
console.log('main1');  // 宏任务：同步执行 直接读取


setTimeout(function(){// 宏任务
    console.log('setTimeout');
    process.nextTick(function(){
        console.log('process.nextTick2');
    })
},0);

new Promise(function(resolve,reject){// 微任务队列
    console.log('promise'); // 同步执行，立刻执行
    resolve();
}).then(function(){
    console.log('promise then');// 微任务队列
});
process.nextTick(function(){ // 微任务队列，nextTick 在微任务中的顶部
    console.log('process.nextTick1');
});

console.log('main2');// 宏任务：同步执行 直接读取

//main1 ，promise ， main2  ，  process.nextTick1 ， promise then ， setTimeout ， process.nextTick2
