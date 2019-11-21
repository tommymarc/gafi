let name = 'xxx';
let age = 9;
 //对象的属性名和变量名如果一样的话可以二合一
// let obj = {name:name, age:age};
let obj = {name,age};


let obj1 = {
    age:1,
    getFood(){
        return "面包";
    }
};
let obj2 = {age:2};
let obj3 = {};
//设置obj3的原型为obj1
Object.setPrototypeOf(obj3,obj1);
//obj3.__proto__ = obj1
console.log(obj3);// {}
console.log(arr3.age);// 1
let obj4 = {
    __proto__ : obj1,
    getFood(){// 如果对象中自己已经命名了，则用自己的，如果自己未命名，则用父级
       //通过super可以调用父级的方法
        return '牛奶'+super.getFood();
    }
};
console.log(obj4.age);// 1
console.log(obj4.getFood());// 牛奶面包
