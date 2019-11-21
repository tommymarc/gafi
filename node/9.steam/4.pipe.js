
let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{
    highWaterMark:3
});
let ws = fs.createWriteStream('./2.txt',{
    highWaterMark:3
});

//建立目标可写流
rs.pipe(ws);  // 建立管道
//移除目标可写流
rs.unpipe(ws);// 关闭管道
//当监听可读流data事件的时候会触发回调函数的执行
//可以实现数据的生产者和消费者速度的均衡
//tcp http 网络层
rs.on('data',function(data){
    console.log(data);
    let flag = ws.write(data);
    //当没有可写流的时候
    if(!flag)
    //停止读取文件
    rs.pause();
});

//当要写的数据的长度大于highWaterMark 高水位线的时候，drain 执行
//恢复读取文件
ws.on('drain',function(){
    //继续开始读取
    rs.resume();
});
ws.on('end',function(){
    //结束可写流
    ws.end();
})