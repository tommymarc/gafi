/**
 *  箭头函数
 *  1.声明函数的更简单的方法
 *
 **/
/*
let sum = function(a,b){
    return a + b;
}
 */
let sum = (a,b)=>{
    return a + b;
};
sum(1,2);//3
//如果有且只有一个参数,可以省略 () 小括号
//如果只有返回值，没有别的函数体代码，则可以省略 {} 花括号
let double = num => num*2;
console.log(double(2));//4
/*
var double = function double(num){
    return num * 2;
    }
 */

//箭头函数没有自己的this，它会使用上层的this
let obj = {
    name:'xxxx',
    //this: obj
    getName(){//对象函数体，新的声明方法
        //this: obj
        /*
        var _this = this;
        setTimeout(function(){
            console.log(_this.name);//此处this 指向为undefined
        },1000)
         */
        setTimeout(()=>{
            console.log(this.name);
        },1000)
    }
}
obj.getName();

//箭头函数的this：是定死的，指向外层的this
//箭头函数虽好，但是不能应用到所有情况。
//比如想要让this随着调用函数变化而变化的时候，不可用
/**
let obj2 = {
    name:'xx',
    getName:()=>{
        console.log(this.name);//undefined
    }
};
obj2.getName();//undefined
let obj3 = {
    name:'9',
    gN:obj2.getName
}
obj3.gN();//undefined
 **/
