/**
 * var
 * 1.可以重复声明
 * 2.不能定义常量 var PI = 3.14
 * 3.不支持块级作用域 if(true){var a = 10;}
 **/
//变量名a已经定义过了，不能重复声明
// let a = 10;
// let a = 20;

//不能定义常量
/*const PI = 3.14;
//试图给一个常量赋值，这是错误的
PI =3.15;*/

/*if(true){
    let a = 10;
}
//块内的定义，外部无法拿到
console.log(a);*/

// 以前js只有二个作用域，一个全局，一个函数级
/*
(function(){

})()

let a = 20; //外层作用域
{//内层作用域
    console.log(a); //a没用定义
    //let 没有预解释
    let a = 10;
}
*/

/*
for(var i = 0 ; i<3; i++){
    setTimeout(function(){
        console.log(i);  //3； 3； 3；
    },1000)
}

for(let i = 0 ; i<3; i++){
    setTimeout(function(){
        console.log(i);  //0； 1； 2；
    },1000)
}
*/

//虽然常量不能再引用别的对象，但是它的值如果是一个引用类型的话，引用对象的属性还是可以改的
const USER ={name:'xxxx'};
USER.name='xxxx2';

//es6中新增加的二种声明变量的方式，可以解决var声明的问题
