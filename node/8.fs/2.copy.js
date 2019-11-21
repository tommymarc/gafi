
let fs = require('fs')
//为了实现节约内存的拷贝，读一点写一点(异步效率高)
const BUFFER_SIZE = 3; //缓存大小为3个字节（读3个字节，写3个字节..）
function copy(src,target){
    fs.open(src,'r',0o666,function(err,readFd){
        fs.open(target,'w',0o666,function(err,writeFd){
            let buff = Buffer.alloc(BUFFER_SIZE);
            !function next(){
                //bytesRead : 实际读到的字节数
                fs.read(readFd,buff,0,BUFFER_SIZE,null,function(err,bytesRead,buffer){
                    if(bytesRead>0)
                    fs.write(writeFd,buff,0,bytesRead,null,next)
                });
            }();//递归方法，自执行
        })
    })
}
copy('1.txt','2.txt')
