/**
 * - 写一个类，可以传入一个文件路径得到类的实例
 * - 然后可以监听它的newLine 事件，当这个行读取器每次读到一行的时候
 *   就会向外发射newLine 事件，当读到结束的时候会发射end事件
 **/

let EventEmitter = require('events');
let util = require('util');
let fs = require('fs');
const NEW_LINE = 0x0A; // \n   换行
const RETURN = 0x0D;   // \r   回车
function LineReader(path,encoding){
    this.encoding = encoding||'utf8';
    EventEmitter.call(this);
    this._reader = fs.createReadStream(path);
    //当给一个对象添加一个新的监听函数的时候会触发发射newListener事件
    this.on('newListener',(type,listener)=>{
        //如果说你添加了newLine 监听，那么就开始读取文件内容并按行发射数据
        if(type == 'newLine'){
            //当监听了一个可读流的readable 事件，流会调用底层的读取文件的API方法
            //然后填充缓存区，填充完之后向外发射readable事件(暂停模式)
            let buffers = [];
            this._reader.on('readable',()=>{
                let char;//Buffer 数组：是一个只有一个字节的buffer
                while(null != (char = this._reader.read(1))){
                    switch(char[0]){
                        case NEW_LINE:
                            //buffer数组 传一个buffers 实例
                            this.emit('newLine',Buffer.from(buffers).toString(this.encoding));
                            buffers.length = 0;
                            break;
                        case RETURN:
                            //buffer数组 传一个buffers 实例
                            this.emit('newLine',Buffer.from(buffers).toString(this.encoding));
                            buffers.length = 0;
                            //往后再读一个字节
                            let nChar = this._reader.read(1);
                            if(nChar[0] != NEW_LINE){
                                buffers.push(nChar[0]);
                            }
                            break;
                        default:
                            buffers.push(char[0]);
                            break;
                    }
                }
            });
            //当你用流区监听数据的时候，当读完了都会触发end事件
            this._reader.on('end',()=>{
                this.emit('newLine',Buffer.from(buffers).toString(this.encoding))
                this.emit('end');
            });
        }
    })
}
util.inherits(LineReader,EventEmitter);

module.exports = LineReader;