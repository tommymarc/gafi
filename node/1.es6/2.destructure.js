/**
 *解构  分解一个对象的结构
 **/
let arr = [1, 2, 3];
/*
let a = arr[0];
let b = arr[1];
let c = arr[2];
*/
//解构的时候，等号的二边结构类似。右边还必须是一个真是的值
let[a, b, c ] = arr;
console.log(a,b,c); //1， 2， 3

let arr2 = [
    {name:'xx1',age:9},
    [1,2],3
];
// let [{name,age},[d,e],f] = arr2;
let[json,arr3,f] = arr2;
// console.log(name,age,d,e,f);
console.log(json,arr3,f);

let obj1 = {name: 'xxx',age: 9};
// let{name, age} = obj1;
// console.log(name,age);

let{name:myname,age:myage} = obj1;//更改变量名
console.log(myname,myage);

//默认解构，如果能取出来值就用取出来的值，如果取不出来就用默认值
let obj2 = {name:'xxx',age:9};
let{name,age=8} = obj2;
console.log(name,age); // 1⃣ xxx 8  //  2⃣ xxx 9

let arr4 = [1,2,3];
//省略赋值
let[ , , j] = arr4;

