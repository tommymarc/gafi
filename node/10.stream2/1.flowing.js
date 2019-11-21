/**
 * 可读流有两种模式  flowing 和 pause
 * 暂停模式 pause
  -
 * 流动模式 flowing
  - 所有初始工作模式为paused 的Readable 流，可以通过下面三种途径切换到 flowing 模式:
  - 监听'data' 事件
  - 调用 stream.resume() 方法
  - 调用 stream.pipe()方法将数据发送到 Writable
  - 流动模式不缓存，直接发射，然后读取下次的数据。如果用流动模式，而且没有消费，数据就白白丢失了
 */

//flowing 流动模式，自动操作
let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{
    highWaterMark:3
});
/*
  stream.emit('data',chunk);
  stream.read(0);
 */
/*
rs.on('data',function(data){
    console.log(data);
});
rs.on('end',function(){
    console.log('end');
});

 */
/**
 -当监听readable 事件的时候，会进入暂停模式
 -当监听readable 事件的时候，可读流会马上去向底层读取文件，
  然后把读到的文件放在缓存区里面
  const state = this._readablestate
  self.read(0)  只填充缓存，但是并不会发射data 事件，但是会发射
  stream.emit('readable') 事件
  this._read(state.highWaterMark) 每次调用底层的方法读取的时候是读取3个字节
 **/
rs.on('readable',function(){
    //length 就是指缓存区数据的大小
    //state.length += chunk.length; //==3
    console.log(rs._readableState.length+'一');
    //read如果不加参数表示读取整个缓存区的数据
    //参数1 读取一个字段，如果可读流发现你要读的字节小于等于缓存字节length大小,则直接返回
   let ch =  rs.read(1);
    console.log(ch);
    console.log(rs._readableState.length+'二');
    // ch = rs.read(1);
    // console.log(ch); 
    // console.log(rs._readableState.length+'四');
    //当你读完指定的字节后，如果可读流发现剩下的字节已经比最高水位线小了。
    //则立马再次读取填满 最高水位线
    //
    //state.buffer 缓存区
    // setTimeout(function(){
    //     console.log(rs._readableState.length+'三');
    // },200)
});
