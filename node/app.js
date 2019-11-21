// 类型转换

let val ;

//number to string
val = String(5);
val = String(4+5);

//bool to string
val = String(true);

//Date to string
val = String(new Date());


//Array to string
val = String([1,2,3,4]);

//toString()
val = (5).toString();
val = true.toString();

//String to Number
val = Number('5');

//bool to Number
val = Number(true);
val = Number(false);

//Null to Number
val = Number(null);

//NaN
val = Number("hello");
val = Number([1,2,3]);

//另外一种形式
val = parseInt('100');
val = parseInt('200');
val = parseInt('100.30');//100 取整的
val = parseInt('100');

val = parseFloat('100.31'); //100.31 取小数
val = parseFloat('100.30'); //100.3  自动省略0



//输出
console.log(val);
console.log(typeof val);
// console.log(val.length);
console.log(val.toFixed(2));// 去数字小数点后的位数

const val1 = 5;
const val2 = 6;
const sum = val1 + val2 ;
console.log(sum);
console.log(typeof sum);
