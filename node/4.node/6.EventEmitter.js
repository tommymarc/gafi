/**
 * node非常重要的模块叫events   事件发射器
 * 在node里面，node是基于事件驱动(异步任务执行，放在任务事件队列中)
 *   - addListener(event,listener)      对指定事件绑定事件处理函数
 *   - on(event,listener)               对执行事件绑定事件处理函数
 *   - once(event,listener)             对指定事件指定只执行一次的事件处理函数
 *   - removeListener(event,listener)   对指定事件解除事件处理函数
 *   - removeAllListeners([event])      对指定事件解除所有事件处理函数
 *   - setMaxListeners(n)               指定事件处理函数的最大数量n为整数，代表最大的可指定事件处理函数的数量
 *   - listeners(event)                 获取指定事件的所有事件处理函数
 *   - emit(event,[arr1],[arr2],[...])  手工触发指定事件
 */
let EventEmitter = require('events');//事件发射器
let util = require('util');//工具类
//这是一个类
function Bell(){ //钟
    EventEmitter.call(this);//继承私有属性
}
//继承EventEmitter的类
//进行原型继承  继承公用
//Object.setPrototypeOf(ctor.prototype,superCtor.prototype)
// 子类原型对象 = 父类原型对象
// ctor.prototype.__proto__ =  superCtor.prototype;
util.inherits(Bell,EventEmitter);
let bell = new Bell();
//学生进教室
function studentInClassroom(roomNum,things){//设置回调函数
    console.log(`学生带着${things}进${roomNum}教室`);
}
function teacherInClassroom(roomNum,things){
    console.log(`讲师带着${things}进${roomNum}教室`);
}
function masterInClassroom(roomNum,things){
    console.log(`校长带着${things}进${roomNum}教室`)
}
bell.addListener('响应',studentInClassroom);//on// 监听绑定事件
bell.on('响应',teacherInClassroom);//on// 监听绑定事件
bell.once('响应',masterInClassroom);//once//  监听一次绑定事件

//第一个参数是事件类型，第二个参数和以后的参数会传递给监听函数
bell.emit('响应','303','书');//发射一个响的事件 (触发绑定事件)

var lr ='*'.repeat(35).split(' ');// 无间隙***
// var lr = new Array(35).fill('*'); // *,*,*,*
console.log(`${lr}`)
// console.log(lr); ['*']

bell.emit('响应','303','书');//发射一个响的事件 (触发绑定事件)
bell.setMaxListeners(0);//不限制绑定事件 listeners 的条数
bell.setMaxListeners(15);// 设置绑定事件listeners 最大条数为15


/**
 * 首先加载EventEmitter 模块，让后续继承
 * 加载util模块来实现继承   (util 工具类，里面有很多供应方法：format、inherits、inspect、判断类型方法(isString...)、promisify)
 * 如果想让bell 继承 EventEmitter
 * 则需要用的util.inherits(子类，父类) 实现原型继承（固有方法）
 * 私有继承需要用的  EventEmitter.call（this）
 */

