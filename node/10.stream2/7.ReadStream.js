let EventEmitter = require('events');
let fs = require('fs');
class ReadStream extends EventEmitter{
    constructor(path,options){
        super(path,options);
        this.path = path;
        this.flags = options.flags||'r';
        this.mode = options.mode||0o666;
        this.highWaterMark = options.highWaterMark||64*1024;
        this.start = options.start||0;
        this.pos = this.start;
        this.end = options.end;
        this.encoding =options.encoding;
        this.flowing = null;
        this.buffer = Buffer.alloc(this.highWaterMark);//建立一个勺子
        this.open();//准备打开文件读取
        //当给这个实例添加了任意的监听函数时会触发newListener事件
        this.on('newListener',(type,listener)=>{
            if(type == 'data'){
                //如果监听data事件，流会自动切换到流动模式
                this.flowing = true;
                this.read();
            }
        })
    }
    //开始读文件
    read(){//读文件前，先判断文件是否打开
        if(typeof this.fd !='number'){//文件还未打开
           return this.once('open',()=>this.read());//先打开文件
        };
        let howMuchToRead = this.end?Math.min(this.end-this.pos+1,this.highWaterMark):this.highWaterMark;
        //this.buffer 并不是缓存区,this.buffer 就像一个勺子，不停的复用
        fs.read(this.fd,this.buffer,0,howMuchToRead,this.pos,(err,bytes)=>{//bytesReaded 是实际读到的字节数
                if(err){
                    if(this.autoClose)
                        this.destroy();
                    return this.emit('error',err)
                }
                if(bytes){
                    let data = this.buffer.slice(0,bytes);
                    this.pos += bytes;
                    data = this.encoding?data.toString(this.encoding):data;
                    this.emit('data',data);
                    //如果有文件末尾，已经越界
                    if(this.end && this.pos >this.end){
                        return this.endFn();
                    }else{
                        if(this.flowing)
                        this.read();
                    }
                }else{
                    return this.endFn();
                }
        });
    }
    endFn(){
        this.emit('end');
        this.destroy();
    }
    open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err){//打开失败
                if(this.autoClose){
                    this.destroy();
                    return this.emit('error',err);
                }
            }
            this.fd = fd;
            this.emit('open');
        })
    }
    destroy(){
        fs.close(this.fd,()=>{
            this.emit('close');
        })
    }
    pipe(dest){
        this.on('data',data=>{
            let flag = dest.write(data);//返回一个boolean值
            if(!flag){//flag 为false 写不进去了，就暂停
                this.pause();
            }
        });
        //resume恢复事件，继续读继续写
        dest.on('drain',()=>{//已经写的读完了，继续读继续写
            this.resume();
        })
    }
    //可读流会进入流动模式，当暂停的时候，流动模式被关闭
    pause(){
        this.flowing = false;
    }
    resume(){
        this.flowing = true;
        this.read();
    }
}
module.exports = ReadStream;