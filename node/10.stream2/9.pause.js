let fs = require('fs');
let ReadStream = require('./9.ReadStream')
//1234567890
let rs = new ReadStream('./1.txt',{
    highWaterMark:3,
    encoding:'utf8'
});
//readable 暂停模式
//在真实情况下，当可读流创建后会立刻进入暂停模式，会立刻填充缓存区，填highWaterMark个字节
//缓存区大小是可以看到的 rs._readableState.length
rs.on('readable',function(){
    console.log(rs.length);//2
    //当消费调一个字节后，缓存区变成2个字节了
    let char = rs.read(1);
    console.log(char);//1
    console.log(rs.length);//2
    //一旦发现缓存区的字节数小于最高水位线，则会再读取到最高水位线个字节，填充到缓存区里面
    setTimeout(function(){
        console.log(rs.length)
    },500); //5

});