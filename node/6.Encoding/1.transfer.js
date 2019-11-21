/**
 * 以前的JS只需要处理字符
 * 如何实现进制的转换
 *
 **/
let a = 0b10100;  //0b二进制的前缀
console.log(a);

let b = 0o24;//八进制
console.log(b);

let c = 20 ; //十进制

let d = 0x14; //十六进制
console.log(d);

//如何把任意进制转换成十进制
console.log(parseInt('10100',2));//20

//如何把十进制转成任意进制
console.log(c.toString(2));//10100

//如何把八进制转成十六进制
console.log(b.toString(2));//10100

