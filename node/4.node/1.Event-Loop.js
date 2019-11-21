/**
 * Event Loop(事件循环)
 - 主线程从任务队列中读取事件，这个过程是循环不断的，所有整个的这种运行机制又称为Event Loop(事件循环)
 - 所有异步回调 都会放在Event Loop 事件回调队列
 */

function read(){
    console.log('1');
    setTimeout(function(){
        console.log('2');
        setTimeout(function(){
            console.log('3');
        })
    },);
    setTimeout(function(){
        console.log('4');
    },)
    console.log('5');
}
read(); // 1,5,2 ,4 , 3
/*
 read() => stack栈里面
        => 执行同步console.log(1) console.log(3)
        => webAPIs
        => callback queue 循环队列
        => 回调到stack栈
        => 执行异步setTimeout() console.log(2)
 */

/**
 * 事件是何时放入Event Loop 循环队列
 * 比如ajax 是发送ajax的时候加入队列，还是ajax返回数据的时候加入队列？
 * 异步完成之后 加入队列的.谁先完成异步，谁先进入
 */
/*
function read1(){
    console.log(1);
    ajax(); //需要3秒才会返回 4
    setTimeout(function(){
        console.log(3);
    },1);
}
read1(); // 1 ,3 ,4
 */
function read2(){
    console.log('num2-1');
    setTimeout(function(){
        console.log('num2-2');
        setTimeout(function(){
            console.log('num2-3');
        })
    },1000);
    setTimeout(function(){
        console.log('num2-4');
    },500)
    console.log('num2-5');
}
read2(); // num2-1, num2-5, num2-4 , num2-2 , num2-3

function next(){
    console.log(1);
    setTimeout(function(){
        console.log(2);
    });
    //nextTick 是把这个函数放在当前stack执行栈的尾部
    process.nextTick(function(){
        console.log(3);
        process.nextTick(function(){
            console.log(4);
            process.nextTick(function(){
                console.log(5);
            })
        })
    })
}
next();//1 ,3 ,4, 5, 2

