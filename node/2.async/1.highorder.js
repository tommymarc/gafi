/**
 * 高阶函数
 * 1.在js里，函数是一等公民
 *   1.可以作为函数的返回值，2.也可以作为函数的参数
 **/
/*
//判断一个参数是否是字符串
function isString(param){
    return Object.prototype.toString.call(param) == '[object String]';
}

//判断一个参数是否是数组
function isArray(param){
    return Object.prototype.toString.call(param) == '[object Array]'
}
 */

//函数可以作为返回值
function isType(type){//批量生产函数
    return function(param){//私有作用域，闭包
       return Object.prototype.toString.call(param) == `[object ${type}]`;
    }
}
let isString = isType('String');
let isArray = isType('Array');
console.log(isString({}));//false
console.log(isString('123'));//true
console.log(isArray([1,2,3]));//true



//lodash 里的方法 after 指定一个函数被调用多少次才能真正执行
//函数可以作为参数传到另外一个函数里面
//eat() 作为参数fn() 传入到after()里面
function eat(){
    console.log('吃完了');
}
function after(times,fn){
    let count = 0;
    return function(){
        if(++count == times)
            fn();
    }
}
let newEat = after(3,eat);
newEat();
newEat();
newEat();

/**
 *异步编程的语法目标，就是怎样让它更像同步编程
 *  - 回调函数实现
 *  - 事件监听
 *  - 发布订阅
 *  - Promise/A+ 和生成器函数
 *  - async/await
 *
 * 回调
 * 所谓回调函数，就是把人物的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数
 *
 *
 **/