//0 标准输入  1 标准输出   2 错误输出
//在linux 输入和输出都对应一个文件描述符
//它是一数字，从0开始
/**
console.log('标准输出');
console.error('错误输出');

//监听输入data
process.stdin.on('data',function(data){
    console.log(data);
})

let fs = require('fs');
fs.write(0,Buffer.from('a'),0,1,null,function(err,bytesWritten){
    console.log(bytesWritten)
});
fs.write(1,Buffer.from('b'),0,1,null,function(err,bytesWritten){
    console.log(bytesWritten);
});
fs.write(2,Buffer.from('c'),0,1,null,function(err,bytesWritten){
    console.log(bytesWritten);
});
**/

/**
 * 整体  打开\关闭文件流程
 **/

let fs = require('fs');
fs.open('./2.txt','w',0o666,function(err,fd){//打开文件
    fs.write(fd,Buffer.from('a'),0,1,null,function(err,bytesWritten){
        //写入的文件会先放在缓存区里面
        console.log(bytesWritten);
        //强行的把缓存区的数据写入文件，并且关闭
        fs.fsync(fd,function(err){
            fs.close(function(){
                console.log('关闭')
            })
        })
    })
})