let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{
    highWaterMark:3
});
//立刻从文件中读取highWaterMark(3字节)数据，读完之后填充缓存区，
// 然后触发readable事件(我已经OK，来读取吧)
rs.on('readable',()=>{
    let ch = rs.read(1);
    console.log(ch);
    setTimeout(()=>{
        //打印读取多少个字节
        //当读了一个字节后，发现只剩下2个字节，不够highWaterMark
        // 会再次读取highWaterMark个字节并填充到缓存区
        console.log(rs._readableState.length);
    },200)
})