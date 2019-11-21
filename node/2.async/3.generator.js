/**
 * Generator/yield
 * 生成器是一个函数，可以用来生成迭代器
 * 生成器函数和普通函数不一样，普通函数是一旦调用一定会执行完，不能停顿
 * 但是生成器函数中间可以暂停，可以执行一会歇一会儿
 * 生成器函数遇到暂停点就会停下来，直到再次让它执行
 *
 *
 *  - 当你在执行一个函数的时候，可以在某个点暂停函数的执行，并且做一些其他工作，然后再返回这个函数继续执行，甚至是携带一些新的值，然后继续执行
 *  - 上面描述的场景正式javaScript生成器函数所致力于解决的问题。当我们调用一个生成器函数的时候，它并不会立即执行，而是需要我们手动的去执行迭代操作（next方法）
 *     也就是说，调用生成器函数，它会返回给一个迭代器。迭代器会遍历每个中断点。
 *  - next 方法返回值的value 属性， 是Generator 函数向外输出数据； next 方法还可以接收参数，这是向Generator 函数体内输入数据
 **/
/**
//生成器的使用
function * foo(){
    var index = 0;
    while(index < 2){
        yield index++ ;//暂停函数执行，并执行yield后的操作
    }
}
var bar = foo(); //返回的其中是一个迭代器

console.log(bar.next()); //{value: 0 ,done:false }
console.log(bar.next()); //{value: 1 ,done:false }
console.log(bar.next()); //{value: undefined ,done:true }
 **/

//生成器函数有一个特点，需要 ➕ *
//生成器有若干个阶段，如何划分这些阶段呢 ？
//yield 产出，
function *go(){
    console.log(1);
    //此处的b 用来供外界输入进来的
    //这一行代码实现输入和输出
    //本次的输出放在yield后面，下次的输入放在yield前面
    let b = yield 'a';  //第一个next 执行暂停点
    console.log(2);
    let c = yield b;    //let b 传参到 yield b 中
    console.log(3);
    return c;   // return 则 done 为true
}
// 生成器函数和普通的函数不一样，调用它的话函数并不会立刻执行
// 它返回此生成器的迭代器
// 迭代器是一个对象，每调用一次next就可以返回一个值对象
let it = go(); //调用go()的时候 函数是不会执行的

//因为第一次执行是直接从go()开始，并无暂停点
//第一次传参由 go() 传参  *go(a){   yield a;}  let it = go('a值')；
//next 第一次执行不需要传参，传参是没有意义的
let r1 = it.next();  //当调用next

//第一次调用next会返回一个对象  此对象有两个属性：
//value 就是yield后面的值， done 表示是否迭代完成
console.log(r1);   // { value: 'a', done: false }
let r2 = it.next('B值'); //传值给 b
console.log(r2);   // { value: 'B值', done: false }
let r3 = it.next();
console.log(r3);   // { value: undefined, done: true }
/*
let r3 = it.next('C值');
console.log(r3);   // { value: 'C值', done: true }
 */
