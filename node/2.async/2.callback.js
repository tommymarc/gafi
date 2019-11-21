/**
 * 如果需要读取一个文件，异步读取
 * 异步是靠回调来实现的
 **/
let fs = require('fs');
/**
 * 回调的特点是error first
 * 调用回调函数的时候 第一个参数永远是错误对象
 *
 */
/*
fs.readFile('./1.txt','utf8',function(err,data){
    if(err){//如果err 有值，就表示程序出错了
        console.log(err);
    }else{//如果error为空，就表示成功了 没有错误
        console.log(data)
    }
});
 */

/**
 * 回调函数的问题
 * 1. 无法捕获错误 try catch
 * 2. 不能return
 * 3. 回调地狱 （callback, callback,callback...)
 * 执行回调函数是另外一个过程，而后面的代码都已经执行完毕了
 */
/*
function read(filename){
    fs.readFile('./1.txt','utf8',function(err,data) {
        if (err) {//如果err 有值，就表示程序出错了
            console.log(err);
        } else {//如果error为空，就表示成功了 没有错误
            console.log(data)
        }
    })
}
try{
    read('./1.txt');
}catch(e){
    console.log('err',e);
}
let result = read('./1.txt');

console.log(2);
 */

/**
 * 当你访问服务器的时候，比如要请求一个HTML页面，比如用户列表。
 * 服务器一方面回去读取模版文件，可能是ejs pug jade handlebar，
 * 另一方面还要读取数据(可能会放在文件里，也可能会放在数据里)
 * 它们都很慢，所以都是异步的
 * 这种恶魔金字塔有一下问题
 *  1. 非常难看
 *  2. 非常难以维护
 *  3. 效率比较低，因为他们是串行的
 */
/*
fs.readFile('./template.txt','utf8',function(err,template){
    fs.readFile('./data.txt','utf8',function(err,data){
        console.log(template + '' + data);
        fs.readFile('./data.txt','utf8',function(err,data){
            console.log(template + '' + data);
            fs.readFile('./data.txt','utf8',function(err,data){
                console.log(template + '' + data);
            })
        })
    })
})
 */
/**
 *如何解决这个回调嵌套的问题
 *  1.通过时间发布订阅来实现(node里面有模块)
 *      这是node 核心模块中的一个类，通过它可以创建事件发射器的实例，
 *      里面有两个核心方法 on emit，on表示注册监听，emit表示发射事件
 */
/*
let EventEmitter =require('events');
let eve = new EventEmitter();
//这个html 对象是存放最终数据
let html = {};  //template data
//监听数据获取成功事件，当事件发生之后调用回调函数
eve.on('ready',function(key,value){
    //监听ready 事件  ，1 key 是html对象的属性名，2 value 是html对象的值
    html[key] = value;
    if(Object.keys(html).length == 2){
        console.log(html);
    }
});
fs.readFile('./template.txt','utf8',function(err,template){
    //发射ready事件
    // 1 事件名   2 参数往后是传递给回调函数的参数
    eve.emit('ready','template',template);
});
fs.readFile('./data.txt','utf8',function(err,template){
    eve.emit('ready','data',data);
});
 */

/**
 * 通过done()  哨兵函数来处理
 **/
let EventEmitter =require('events');
let event = new EventEmitter();
//这个html 对象是存放最终数据
// let html = {};  //template data

/*
function done(key,value){
    html[key] = value;
    if(Object.keys(html).length == 2){
        console.log(html)
    }
}
 */

//工厂函数 -处理多数据异步进行
function render(length,cb){//任务对象数，回调函数
    let html = {};
    return function(key,value){
        html[key] = value;
        if(Object.keys(html).length == length){
            cb(html);
        }
    }
}
//通过一个变量来控制任务完成，通过计数器来累加
let done = render(2,function(){
    console.log(html);
});

fs.readFile('./template.txt','utf8',function(err,template){
    done('template',template);
});
fs.readFile('./data.txt','utf8',function(err,data){
    done('data',data);
});

/**
 * async 模块 原理就是这样
 **/