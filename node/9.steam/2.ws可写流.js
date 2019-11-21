/**
 * 可写流 就是往里面写
 * 当往可写流里写数据的时候，不是会立刻写入文件的，而是会写入缓存区。
 * 缓存区的大小就是highWaterMark，默认值就是16k。
 * 然后等缓存区满了之后再次真正的写入文件里。
 * 可以判断缓存区是否已经满
 *
 **/
let fs = require('fs');
let ws = fs.createWriteStream('./2.txt',{
        flags:'w',
        mode:0o666,
        start:0,
        highWaterMark:3 //内部就是一个buffer列表

});
/*
 //会先把'1'写入缓存区里面，依次写入 2，3，4
 //如果缓存区已经满，返回false；如果缓存区未满，返回true
 //如果不能接着写，返回false；如果能接着写，返回true
 // 按理说，如果返回了false，就不能再往下写了，
    但是如果真的写了，数据也不会丢失，会缓存在内存里，等缓存区清空之后，再从内存里读出来
 */
let flag = ws.write('1');
console.log(flag); //true
flag = ws.write('2');
console.log(flag); //true
flag = ws.write('3');
console.log(flag); //false
flag = ws.write('4');
console.log(flag); //false

//写入结束
ws.end('结束');

//drain方法


//缓存区数据都已经传给底层系统之后 ，触发finish 事件
ws.on('finish',()=>{
        console.error('所有的写入已经完成')
})