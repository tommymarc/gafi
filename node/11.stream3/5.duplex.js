//双峰流  可读可写流
let {Duplex} = require('stream');
let index = 0;
let duplex = Duplex({
    read(){//可读流
        // this.push('a');// 死循环
        //this.push(null);// 触犯end 事件 结束了
        if(index++<3){
            this.push('a');
        }else{
            this.push(null);
        }
    },
    write(chunk,encoding,cb){//可写流
        console.log(chunk.toString().toUpperCase());
        cb();//callback 是系统提供的，写入下个数据
    }
});
//process.stdin  标准输入流    on.data
//process.stdout 标准输出流    process.stdout.write
process.stdin.pipe(duplex).pipe(process.stdout);