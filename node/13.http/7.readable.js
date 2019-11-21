let fs = require('fs');
let path = requrie('path');
let rs = fs.createReadStream(path.join(__dirname,'1.txt'),{
    highWaterMark:3
});
//默认情况下，waterMark 64k
//监听readable 就是暂停模式
rs.on('readable',function(){
    //把缓存区读空  read 传不传读到的字节数跟流动模式无关
    let data = rs.read();
    console.log(data);
});