let fs = require('fs');

let str = '夏天';
fs.open('./1.txt','w',0o666,function(err,fd){
    let buff = Buffer.from(str);
    //当我们调用write方法写入文件的时候，并不会直接定如无力文件，
    // 而是先写入缓存区，再批量写入无力文件
    fs.write(fd,buff,0,3,null,function(err,bytesWritten){
        console.log(bytesWritten);//3
        fs.write(fd,buff,3,3,null,function(err){
            //迫使操作系统立刻马上把缓存区的内容写入物理文件
            fs.fsync(fd,()=>{
                fs.close(fd,()=>{
                    console.log('关闭文件完成');
                })
            });
        })
    });
})