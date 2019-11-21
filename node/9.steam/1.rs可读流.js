/**
 * 可读流 Readable Stream
 * open -> data -> error -> end -> close
 */
let fs = require('fs');
//通过createReadStream 创建一个可读流
let rs = fs.createReadStream('./1.txt',{
    //可读流内的参数
    flags:'r', // 对文件进行何种操作
    mode:0o666,// 写文件时候的权限
    encoding:'utf8', //设置文件格式
    start:3,   // 从索引为3的位置开始读
    //唯一一个包括end结束索引的
    end:8,     // 读到索引为8的位置结束
    highWaterMark:3
});
//highWaterMark 缓冲区大小
rs.setEncoding('utf8'); //设置读出来的文件格式为utf8，默认为buffer

//文件打开  open 事件
rs.on('open',function(){
    console.log('文件打开');
})
/*
//on() 监听它的data事件
//当你一旦开始监听data 事件的时候，流就开始读文件的内容并且发射data 事件
//默认情况下，当你监听data 事件后，会不停的读数据，然后触发data 事件
  触发完data事件后，再次读数据
//希望流又一个暂停和恢复触发的机制
*/
rs.on('data',function(data){
    console.log(data);
    rs.pause();//暂停读取和发射data 事件
    setTimeout(function(){
        rs.resume();//恢复 读取并触发data 事件
    },2000)
});

//如果读取文件出现错误 触发error事件
rs.on('error',function(){
    console.log('error');
})

//如果文件读完之后  触发end 事件
rs.on('end',function(){
    console.log('读完了');
})

//文件关闭   触发close 事件
rs.on('close',function(){
    console.log('文件关闭');
})

