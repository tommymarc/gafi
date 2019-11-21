let {Writable,Readable} =require('stream');
let i = 0;
let rs = Readable({
    highWaterMark:2,
    read(){//可读流
        if(i<10){
            this.push(''+i++);
        }else{
            this.push(null);
        }
    }
})
let ws =Writable({//自定义可写流
    highWaterMark:2,
    write(chunk,encoding,callback){
        console.log(chunk.toString());
        // callback();// 调用write callback  继续消费
    }
})
/*  on.data 方法 可以读出10个数
rs.on('data',function(data){
    console.log(data);
})
 */
rs.pipe(ws);
setTimeout(function(){
    console.log(rs._readableState.length);  //2
    console.log(ws._writableState.length);  //2
},500)