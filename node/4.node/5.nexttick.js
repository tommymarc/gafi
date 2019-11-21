/**
 * nextTick   setImmediate  区别和联系
 * nextTick      把回调函数放在当前执行栈的底部
 * setImmediate  把回调函数放在事件队列的尾部
 * nextTick 优先于 setImmediate
 **/
// function read(){
//     setImmediate(function(){
//         console.log(1);
//         process.nextTick(function(){
//             console.log(2);
//             process.nextTick(function(){
//                 console.log(3);
//                 process.nextTick(function(){
//                     console.log(4);
//                 })
//                 setImmediate(function(){
//                     console.log(5);
//                 })
//                 setTimeout(function(){
//                     console.log(6);
//                 }) //setImmediate 跟 setTimeout 都是异步，先后顺序不一定
//             })
//         })
//     })// 0 , 1 , 2 , 3 , 5
//     process.nextTick(function(){
//         console.log(0);
//     })// 0 , 1 , 2 , 3 , 4
// }
// read();

function read1(){
    setImmediate(function(){
        console.log(1);
        setImmediate(function(){
            console.log(2);
            process.nextTick(function(){
                console.log(0);
            })
            setImmediate(function(){
                console.log(3);
            })
        })
    })
}
read1();//1 , 2 , 0 , 3
//当需要立刻执行的重要任务 用nextTick