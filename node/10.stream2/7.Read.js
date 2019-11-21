/**
 * 先写flowing流动模式
 * 流动模式是不走缓存的
 **/
let fs = require('fs');
let ReadStream = require('./7.ReadStream');
let rs = new ReadStream('./1.txt',{
// let rs = fs.createReadStream('./1.txt',{
    flags:'r',
    mode:0o666,
    start:3,
    end:8,//6个，包括结束位置
    highWaterMark:3,//最高水位线是3个字节
    autoClose:true,
    encoding:'utf8'
});
rs.on('open',()=>{
    console.log('open')
})
rs.on('data',data=>{
    console.log(data);
})
rs.on('end',()=>{
    console.log('end');
})
rs.on('close',()=>{
    console.log('close');
})
rs.on('error',error=>{
    console.log(error);
})