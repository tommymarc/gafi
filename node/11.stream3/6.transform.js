//转换流
//实现数据转换的
let {Transform} = require('stream');
let t = Transform({
    transform(chunk,encoding,cb){
        this.push(chunk.toString().toUpperCase());
        cb();
    }
});
//写入t，然后标准输出
process.stdin.pipe(t).pipe(process.stdout);