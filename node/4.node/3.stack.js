//执行上下文环境栈
//栈的执行顺序是先进后出，后进先出！
//执行全局代码和函数时，都会产生一个环境，叫做执行上下文
//执行上下文包括三个周期：创建——运行——销毁
//私有闭包  this  参数  私有变量  上级作用域变量
function one(){
    two();
    console.log(1);
    let a = 'a';
    function two(){
        three();
        console.log(2);
        let b = 'b';
        function three(){
            let c = 'c';
            console.log(a, b, c);
            console.log(3);
        }
    }
}
one();

var x = 'hello';
function sayHello(){
    console.log(x);
    function sayWorld(){
        console.log('world');
    }
    sayWorld();//后
}
sayHello();//先

