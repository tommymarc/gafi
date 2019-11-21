const num1 = 100;
const num2 = 50;

let val

//数值运算
// val = num1 + num2;
// val = num1 - num2;
// val = num1 * num2;
// val = num1 / num2;
// val = num1 % num2;


//Math  Object   数值对象运算
val = Math.PI;   //取pi 的值
val = Math.round(2.6); //3
val = Math.round(2.4); //2
val = Math.round(3.5); //4      round() 四舍五入

val = Math.ceil(2.4);  //3      ceil 向上取整
val = Math.ceil(3.2);  //4
val = Math.ceil(4.2);  //5

val = Math.floor(2.9); //2    floor()向下取整
val = Math.floor(2.5); //2

val = Math.sqrt(64);   //平方  类似于 根号
val = Math.abs(-3);    //绝对值
val = Math.min(2,33,3,4,45,66,-2); //-2
val = Math.max(2,33,3,4,45,66,-2); //55

val = Math.random();    //从0到1 取随机数
val = Math.random()*20+1;    //从1 到20  的随机数
val = Math.floor(Math.random()*20+1);  //从1 到20 的整数

