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
        //buffers 缓存
        this.buffers = [];
        this.length = 0;
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
            this.read(0);
        })
    }
    read(n){
        //缓存区的数据足够用，并且要读取的字节大于0
        let ret;
        if(0<n<this.length){
            ret = Buffer.alloc(n);
            let index = 0;
            /* for(let i=0;i<this.buffers.length;i++){
                 ret[index++] = this.buffers[i];
             }*/
            let b ;
            while(null !=(b = this.buffers.shift())){
                for(let i=0;i<b.length;i++){
                    ret[index++] = b[i];
                    //当index 跟 n 相等，说明已经填充完毕，则结束
                    if(index == n ){
                        //有可能b 没有用完
                        b = b.slice(i);
                        //i 开始往后截,截取到buffer,将它放回去
                        this.buffers.unshift(b);
                        //读到n个字节，缓存区的字节数减少了
                        this.length -= n;
                        break;
                    }
                }
            }
        }
        if(this.length < this.highWaterMark){
            fs.read(this.fd,this.buffer,0,this.highWaterMark,null,(err,bytesRead)=>{
                if(bytesRead){
                    //将所读的数据截取小赖，放入缓存
                    let b = this.buffer.slice(0,bytesRead);
                    this.buffers.push(b);
                    //让缓存区的数量加实际读到的字节数
                    this.length += bytesRead;
                    // this.length += b.length;
                    //缓存区可读，发射readable事件
                    this.emit('readable');
                }else{
                    this.emit('end');
                }
            })
        }

        return  ret && this.encoding?ret.toString(this.encoding):ret;

    }

}
module.exports = ReadStream;