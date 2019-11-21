let name = 'xxxxx',age = 9;
// let desc = name+ "今年" +age+" 岁了";
//1.字符串里可以嵌套变量

//模版语言很多就是这样的原理
let desc = `${name} 今年 ${age} 岁了`;

console.log(desc);
//模版字符串
//模版字符串可以换行
let users = [{id:1, name:'xxxx1'},{id:2, name:'xxxx2'}];
/**
 * <ul>
 *     <li>1:xxxx1</li>
 *     <li>2:xxxx2</li>
 * </ul>
 **/
//映射，把老数组里的每一个元素映射为新数组的每一个元素
let newLis = users.map(function(user,index){
   return `<li>${user.id}:${user.name}</li>>`
}).join('');
//join 连接，把数组内的元素连接在一起，''连接符为空，变成字符串
let ul = (
    `
    <ul>
        ${newLis}
    </ul>
    `
);
console.log(newLis);

/*
function desc(){
    console.log(arguments);
    //{'0':['',' 今年 ',' 岁了 '], '1':' xxxx','2': 9 }
}
let str =desc`${name} 今年 ${age} 岁了`
 */
/*
function desc(string, name, age){
    console.log(string);//['',' 今年 ', ' 岁了 ' ]
    console.log(name);//xxxx
    console.log(age);//9
}
let str =desc`${name} 今年 ${age} 岁了`
 */

//其他运算符  会把后边的所有参数，全部放在一个数组里
//rest其他运算符只能作为最后一个参数

function desc(strings,...rest){
    // console.log(strings);
    // console.log(rest);  // ['xxxx',9]
    let result = '';
    for(let i=0; i<rest.length;i++){
        result += (strings[i]+rest[i]);
    }
    result += strings[i];
    // result += strings[strings.length-1];
    return result.toUpperCase();//转换成大写
}



//带标签的模版字符串就像一个函数调用，参数
//1.参数就是文本的数组（按照变量来分割，文本放入数组内）
let str = desc`${name} 今年 ${age} 岁了`;
// console.log(str);//undefined

//includes() ;  startsWith(); endsWith(); repeat()
//startsWith()   字符串以''开头
//endsWith()     字符串以''结尾
//includes()     字符串是否包含''
//repeat()       字符串出现多少次
//padStart(),endStart()  补齐字符串

//startsWith()
let str3 = 'zxcv';
console.log(str3.startsWith('z'));

let address1 = 'http://www.baidu.com';
let address2 = 'ftp://www.baidu.com';
if(address1.startsWith('http')){
    console.log('http网址')
}else if(address2.startsWith('ftp')){
    console.log('ftp服务器')
};

//endsWith()
let filename = 'avatar.jpg';
if(filename.endsWith('jpg')||filename.endsWith('png')){
    console.log('是一张图片')
};

//includes()
let content = 'abc';
//判断一个字符串中是否包含另一个字符串
console.log(content.includes('b'));
// console.log(content.indexOf('b')!= -1);

// repeat()
let x = '*';
console.log(x.repeat(3)); //***

//padStart()
let str5 = 8;
console.log(str5.padStart(2, '0')); //补齐2位数，08
//padEnd()
console.log(str5.padEnd(2, '0'));//补齐2位数，80
