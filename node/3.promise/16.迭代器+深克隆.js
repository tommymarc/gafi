/**
 * 迭代器
 * it.next()
 */
let arr = [1,2];
for(let item of arr){
    console.log(item);//1   //2
}

//深度克隆  也是面试必问
//支持数字(普通值) 、函数方法、数组、对象

let obj = {
    age:5,
    getAge(){
        console.log(this.age)
    },
    hobby:[1,2,3],
    home:{city:'北京'}
};
//JSON.parse //不支持函数，不支持正则
//let obj2 = JSON.parse(JSON.stringify(obj));
/*
JSON.stringify()实现深拷贝注意点
    1.拷贝的对象的值中如果有函数,undefined,symbol则经过JSON.stringify()序列化后的JSON字符串中这个键值对会消失
    2.无法拷贝不可枚举的属性，无法拷贝对象的原型链
    3.拷贝Date引用类型会变成字符串
    4.拷贝RegExp引用类型会变成空对象
    5.对象中含有NaN、Infinity和-Infinity，则序列化的结果会变成null
    6.无法拷贝对象的循环应用(即obj[key] = obj)

 */
let obj2 = deepClone(obj);
obj2.age = 10;
obj2.hobby.push(4);//添加元素4
obj2.home.city = '上海';
obj.getAge();   //5
obj2.getAge();  //10
console.log(obj);
console.log(obj2);

function deepClone(parent,child){
    //判断是否有child，防止没写 被拷贝的对象
    child = child?child:{};
    for(let key in parent) {
        //不用遍历原型上的属性
        if (parent.hasOwnProperty(key)) {
            //浅克隆，把父属性的值parent[key]  赋给 子属性child[key]
            if (typeof parent[key] == 'object') {
                //如果是数组
                if(Object.prototype.toString.call(parent[key]) == '[object Array]'){
                    child[key] = [];
                }else{// 否则是对象
                    child[key] = {};
                }
                //调用自身
                deepClone(parent[key],child[key])
            } else {// 原型类型（除了null）
                child[key] = parent[key]
            }
        }
    }
    return child;
}
let a=[1,2,[2, 3],4],
    b=deepClone(a);
a[2][0]=10;
console.log(a,b);

/**
 * 浅拷贝：当复制引用值（数组、对象）时，修改复制后的变量，原来的变量也跟着变了
 *   原因：就是当引用值复制时复制的是指针，所以修改它们的变量时指针没有改变，而是指针指向的值变了，所以指向同一指针的原变量也就变了，
 * 深拷贝：修改复制后的变量，被复制的变量不会跟着改变
 *   原因: 就是复制后，给复制变量重新定义值得时候，原来的变量不会受影响，因为此时已经给复制后的变量重新分配指针了
 *   通用的方法prototype判断变量的类型，由于函数具有不可遍历性，所以尽管函数也是引用值，我们也可以按照浅度的方法复制即可
 **/
/*
function getType(obj){
    if(Object.prototype.toString.call(obj)=='[object Object]'){
        return 'Object';
    }else if(Object.prototype.toString.call(obj)=='[object Array]'){
        return 'Array';
    }else{
        return 'nomal';
    }
}

function deepCopy(obj){
    if(getType(obj)=='nomal'){
        return obj;
    }else{
        let newObj = getType(obj)=='Object'?{}:[];
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                newObj[key] = deepCopy(obj[key]);
            }
        }
    }
    return newObj;
}
//这里用到.hasOwnProperty是为了避免在拷贝有继承时拷贝到继承自对象中的值
//（也就是a继承b,使用.hasOwnProperty就是为了只拷贝a中的变量，过滤继承自b中的变量。）
*/

/**
 * 第三方深拷贝库
 * 该函数库也有提供_.cloneDeep用来做 Deep Copy
 * （lodash是一个不错的第三方开源库）
 */
/*
var _ = require('lodash');
var obj1 = {
    a: 1,
    b: { f: { g: 1 } },
    c: [1, 2, 3]
};
var obj2 = _.cloneDeep(obj1);
console.log(obj1.b.f === obj2.b.f);
// false
 */