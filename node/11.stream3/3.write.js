//自定义可写流
let {Writable} = require('stream');
let arr = [];
let ws = Writable({
    write(chunk,encoding,callback){
        arr.push(chunk);
        callback();//进行下一次写入
    }
});
for(let i=0;i<5;i++){
    ws.write(''+i,'utf8',()=>{console.log('执行for循环')});
}
ws.end();
setTimeout(function(){
    console.log(arr.toString());
},500)