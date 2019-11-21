/**
 * 定义buffer 的三种方式
 * 1.通过长度定义buffer
 * 2.通过数组定义buffer
 * 3.字符串创建
 **/

//表示分配一个长度为6个字节的Buffer
//会把所有的字节设置为0 ，清零
let buf1 = Buffer.alloc(6);
console.log(buf1); //<Buffer 00 00 00 00 00 00>
//可以提供默认值,会抹掉数据，提供新的设置值
// let buf2 = Buffer.alloc(6,2);
//分配一块没有初始化的内存
//此数据不安全，随机拿到内存值
let buf2 = Buffer.allocUnsafe(6);
console.log(buf2); //<Buffer 02 02 02 02 02 02>

//字符串创建
let buf3 = Buffer.from('夏天');
console.log(buf3);//<Buffer e5 a4 8f e5 a4 a9>

/**
 *  FILL 填充
let buf4 = Buffer.alloc(4);
console.log(buf4);
//填充
//参数1：填充的值  参数2：填充的开始索引  参数3：结束 索引
buf4.fill(3,1,3);//[0,3,3,0]
console.log(buf4);
 */

//Buffer 永远输出16进制
//参数1：写的字符串，参数2：填充的开始索引，参数3：填充的字节长度 编码
let  buf5 = Buffer.alloc(6);
buf5.write('夏天',0,3,'utf8');
//[]
console.log(buf5);
console.log(buf5.toString());
buf5.write('天',3,3,'utf8');
console.log(buf5);
console.log(buf5.toString());

let buf6 = Buffer.alloc(6);
//向指定的索引写入一个8位的整数，也就是说占用一个字节的整数
buf6.writeInt8(0,0);  //向索引0位置 填入0
buf6.writeInt8(16,1); //向索引1位置 填入16( 16为 '10'，f为15)
buf6.writeInt8(32,2); //向索引2位置 填入32( 32为 '20'  1f为31)
console.log(buf6);//[00,10,20]

let buf7 = Buffer.alloc(4);
//BE :Big Endian  大头在前
//LE :Little Endian 小头在前
//BE就是高位在前
buf7.writeInt16BE(256,0);//从索引为0 开始写入两个字节
console.log(buf7); //[01,00,00,00]
let s = buf7.readInt16BE(0);//0100 -> 256  高位开始读
//let s = buf7.readInt16LE(0);//0001 -> 1  低位开始读

//LE就是地位在前
buf7.writeInt16LE(256,2);//从索引为2 开始写入两个字节
console.log(buf7); //[01,00,00,01]
let s2 = buf7.readInt16LE(2);//0100 -> 256 低位开始读
//let s2 = buf7.readInt16BE(2);//0001 -> 1 高位开始读
console.log(s2);

//把buffer 转成字符串
console.log(buf7.toString());

//长度为6，每个都是1, slice-浅拷贝
let buf8 = Buffer.alloc(6,1);
let buf9 = buf8.slice(2,6);//从索引2，到索引6 拷贝
console.log(buf9);//[01,01,01,01]
buf9.fill(4);//填入4
console.log(buf8);//[01,01,04,04,04,04]

/**
 * string_decoder
 * 它的出现是为了解决乱码问题
 *
 */

let buf10 = Buffer.from('夏天大哥');
console.log(buf10);
let buf11 = buf10.slice(0,5);//5
console.log(buf11);
let buf12 = buf10.slice(5);  //7
console.log(buf12);
console.log(buf11.toString());//夏�
console.log(buf12.toString());//�大哥

// let {sd} = require('string_decoder');
// { StringDecoder: [Function: StringDecoder] } 需要解构
let {StringDecoder} = require('string_decoder');
let sd = new StringDecoder();
console.log(sd);
//write就是读取buffer的内容，返回一个字符串
//write的时候会判断是不是一个字符，如果是的话就输出；不是的话则缓存在对象内部，
// 等下次write的时候会把前面缓存的字符加到第二次的write的buffer上
console.log(sd.write(buf11));//夏     //读取多的字节，会缓存
console.log(sd.write(buf12));//天大哥

//buffer 容器，存取数据用的
//buffer本身是16进制表示方式
//用于读取二进制数据，比方图片的二进制数据










