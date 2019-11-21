/**
 * 函数
 **/
//1 默认参数  。1.必填项不填报错  2.有些参数没有给传参的话可以有默认值
//url地址  调用接口，调用地址
//method  请求类型
//dataType  文本类型 json
/*
function ajax(url,method,dataType){
    if(typeof url == 'undefined')throw Error('url不能为空');
    method = method?method:'GET';
}
 */
function ajax(url=new Error('url不能为空'),method='GET',dataType='json'){
    console.log(url);
    console.log(method);
    console.log(dataType);
}
ajax('/user');

/*
function sum(prefix,a,b){
    return prefix + ( a + b );
}
 */
/**
function sum(prefix,...rest){
    rest =[1,2,3,4];
    //1.循环求和
    let result = 0;
    // forEach()遍历循环数组中的每个元素，把他们一次传入对应的函数
    rest.forEach(function(item){// 类似于JQ里的Each()
        result+=item;
    });

    return prefix + (result);
}
console.log(sum('$', 1, 2));//$3
**/

let arr4 = [1,2,3];
//可以传入一个参数，也可以传入二个参数
//第二个参数表示初始值
//上一次执行结果会成为下一次的初始值
//reduce 计算 汇总 把一个数组中的一堆值计算出来一个值
let result = arr4.reduce(function(val,item,index,origin){ //1.val当前值，2.item当前元素，3.index当前的索引，4.origin原始数组
    return val + item ;// 返回值会成为下一次函数执行的时候的val
},0);

//平均值 (求和除以元素的数量)
//如果没有给初始值的话，第一次执行函数的时候，val=第一次元素 item=第二个元素
let result1 = arr4.reduce(function(val,item,index,origin){ //1.val当前值，2.item当前元素，3.index当前的索引，4.origin原始数组
    // console.log(item, index);
    let sum = val + item ;// 返回值会成为下一次函数执行的时候的val
    if(index == origin.length-1){// 数组的最后一个元素
        return sum/origin.length;
    }else{
        return sum;
    }
},0);
//reduce 从数组的左往右计算
//reduceRight()
let result2 = arr4.reduceRight(function(val,item,index,origin){
    // console.log(item, index);
    let sum = val + item;
    if(index == origin.length-1){
        return sum/origin.length;
    }else{
        return sum;
    }
});
/**
 * reduce
 * item index
 * 1    0
 * 2    1
 * 3    2
 *
 * reduceRight
 * item index
 * 3    2
 * 2    1
 * 1    0
 **/

/**
//reduce() 计算原型
Array.prototype.reduce = function(reducer,initialVal){
    // let result = init;
    for(let i=0; i<this.length; i++){
        initialVal = reducer(initialVal,this[i])
    }//每次计算initialVal的值，累加
    return initialVal;
};

//reduceRight() 计算原型
Array.prototype.reduceRight = function(reducer,initialVal){
    // let result = init;
    for(let i=this.length-1; i>=0; i--){
        initialVal = reducer(initialVal,this[i])
    }//每次计算initialVal的值，累加
    return initialVal;
};

let result5 =arr4.reduce(function(val,item){
    return val + item;
},0);
console.log(result5);
**/

//展开运算符   : 相当于把每个数组中的每个元素依次取出放在新数组
let arr5 = [1,2,3];
let arr6 = [4,5,6];
// let arr7 = [].concat(arr5,arr6);//合并arr5，arr6
let arr7 = [...arr5,...arr6];//
console.log(arr7);

/*
let max = Math.max(1,2,3);
console.log(max);//3
 */

/*
// let max = Math.max.apply(null,arr6);
let max = Math.max(...arr6);
console.log(max);    //6
 */

let obj1 = {name:'1'};
let obj2 = {age:2};
/**
 * 1.循环赋值
 * @type{{}}
 **/
/*
let obj3 = {};
for(let key in obj1){//将obj1全部拷贝给obj3
    obj3[key] = obj1[key];
};
for(let key in obj2){
    obj3[key] = obj2[key];
}
 */

/**
 * 2.assign   拷贝对象方法
 * 第一个参数target   后面的全是来源对象
 **/
/*
let obj3 = {};
Object.assign(obj3,obj1,obj2);
*/

/**
 * 对象解构
 **/
/*
obj3 = {...obj1,...obj2};
 */

//深度拷贝
let obj5 = {name:'xxxx',home:{
    city:'beijing'
}};
/*
let obj6 = {};
obj6 = Object.assign(obj6,obj5);//当改变obj6 ，obj5对象也跟着改变
obj6.home.city = 'guangzhou';
 */
/*
let obj6 = JSON.parse(JSON.stringify(obj5));//深度拷贝，改变obj6之后，obj5不会收到影响
obj6.home.city = 'guangzhou';
 */
/**深度拷贝过于浪费空间，两个内存空间，共同公用，完全两个独立对象**/
function clone(origin){//写深度拷贝方法
    for(let key in origin){
        let newObj = {};
        if(typeof origin[key] == 'object'){//递归拷贝
            newObj[key] = clone(origin[key]);
        }else{
            newObj[key] = origin[key];
        }
    }
    return newObj;
}
let obj6 = clone(obj5);