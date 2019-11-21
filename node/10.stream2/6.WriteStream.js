
let fs = require('fs');
let EventEmitter = require('events');
// let util = require('util');
//让WriteStream 类 继承 EventEmitter 类
class WriteStream extends EventEmitter{
    constructor(path,options) {
        super(path, options);
        this.path =path;
        this.flags = options.flags||'w';
        this.mode = options.mode||0o666;
        this.start = options.start||0;
        this.pos = this.start;// 文件写入索引
        this.encoding = options.encoding||'utf8';
        this.autoClose = options.autoClose;
        this.highWaterMark = options.highWaterMark||16*1024;
        this.buffers =[]; //缓存区
        this.writing = false;//表示内部正在写入数据,默认false，无文件写入
        this.length = 0; //表示缓存区字节的长度
        this.open(); //打开文件

    }
    //打开文件
    　open(){
        fs.open(this.path,this.flags,this.mode,(err,fd)=>{
            if(err){
                //如果文件自动关闭为true的话，关闭掉
                if(this.autoClose){
                    this.destroy();//消除流
                }
                //发射error事件 表示文件出错了
                return this.emit('error',err)
            }
            this.fd = fd;
            this.emit('open');
        })
     }
     //如果底层已经在写入数据的话，则必须将当前要写入数据放在缓冲区里
     write(chunk,encoding,cb){
         //chunk 如果是buffer，否则 chunk 转成 buffer
         chunk = Buffer.isBuffer(chunk)?chunk:Buffer.from(chunk,this.encoding);
         //chunk 的长度
         let len = chunk.length;
         //缓存区的长度加上当前写入的长度
         this.length += len;
         //判断当前最新的缓存区是否小于最高水平线
         let ret = this.length < this.highWaterMark;
        if(this.writing){//表示正在向底层写数据，则当前数据必须放在缓冲区里
         this.buffers.push({
                chunk,
                encoding,
                cb
            });
        }else{//直接调用底层的写入方法进行写入
            //在底层写完当前数据后要清空缓存区
            this.writing = true;
            this._write(chunk,encoding,()=>this.clearBuffer());
        }
         //ret 返回 true or false
         return ret;
     }
     clearBuffer(){
        //取出缓存区中的第一个buffer
         //8 7  drain  6 5 4 drain  3 2 1 drain
        let data = this.buffers.shift();
        if(data){
            //缓存区有值
            this._write(data.chunk,data.encoding,()=>this.clearBuffer())
        }else{
            //缓存区清空了
            this.writing = false;
            this.emit('drain');
        }
     };
     //底层写入方法 _write
     _write(chunk,encoding,cb){
         //如果文件没打开，监听open事件
         if(typeof this.fd != 'number'){
             return this.once('open',()=>this._write(chunk,encoding,cb))
         }
        fs.write(this.fd,chunk,0,chunk.length,this.pos,(err,bytesWritten)=>{
            //如果有错误
            if(err){
                //是否自动关闭
                if(this.autoClose){
                    this.destroy();
                    this.emit('error',err);
                }
            }
            //写入的位置指针往后移
            this.pos +=bytesWritten;
            //写入多少字节，缓存区就要减少多少字节
            this.length -= bytesWritten;
            //如果cb存在的话，就调用cb()
            cb && cb();

        })
     }
     //关闭文件
     destroy(){
        fs.close(this.fs,()=>{
            this.emit('close');
        })
     }
}
module.exports = WriteStream;