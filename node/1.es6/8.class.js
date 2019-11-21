// 类  java中的 ，不能像函数一样调用
//用于创建实例
//定义一个类
/**
 *  以前js里类和构造函数是一体的
 *  类里面可以定义构造函数
 *  当创建定义一个类的实例的时候就会调用构造函数
 */
class Parent{
    constructor(){
        this.name = name;//实例的私有属性
    }
    //静态属性 是类的属性
    static hello(){
        console.log('hello')
    }
    //属于实例的共有属性，相当于原型上的属性
    getName(){
        console.log(this.name)
    }
}

//类的继承
class Child extends Parent{
    constructor(name,age){
        //super指的是父类的构造函数
        super(name);
        this.age = age;
    }
    getAge(){
        console.log(this.age);
    }
}

/*
class constructor Parent can't be invoked without 'new'
类的构造函数 Parent 不能在不通过new的情况下调用
Parent('xx');
 */
let p = new Parent('xx');
p.getName();// xx

/**
//创建实例 create()原型
Object.create = function(prototype){
    //先创建一个空的函数
    function Fn(){}
    Fn.prototype = prototype;
    //返回这个函数的实例
    return new Fn()// __proto__
}
 **/
function Parent1(name){
    this.name = name;
}
//静态属性是属于类的，不需实例就能调用
Parent.hello = 'hello';

function Child1(){

}
// Child1.prototype = new Parent1();  //会拿到Parent1的constructor
Child1.prototype = Object.create(Parent1.prototype)
Child1.prototype.constructor = Child1;
let child1 = new Child1();
console.log(child1.constructor); //会直接找父级的constructor 构造函数
console.log(child1.name);
//child.__proto__   指向父属性 Parent
//child.__proto__.__proto__ = Parent.prototype  指向父属性的prototype

//不需要通过实例来调用，是属于类的，所有的实例共享(可读性)，类级别
class  Hello {
    static defaultProps = {}
    static propTypes = {}
}
//类  和类的实例
//类是一个类别，对象  //Parent
//实例则是一个个具体化的 //p1 、p2、p3...
//一个属性如果放在原型上的话，是可能通过实例来调用的
//但是如果放在类上，不能通过实例来调用，只能用类名来调用

//__proto__   setPrototypeOf prototype  区别
//__proto__ 实例的原型，原型链 继承是通过__proto__来关联
//setPrototypeOf  就是给__proto__赋值