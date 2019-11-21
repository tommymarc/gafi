let fs = require('fs');
let WriteStream = require('./6.WriteStream');
// let ws = fs.createWriteStream('./1.txt',{
let ws = new WriteStream('./1.txt',{
    flags:'w',
    mode:0o666,
    start:0,
    encoding:'utf8',
    autoClose:true,//当流写完之后自动关闭文件
    highWaterMark:3
});
let n = 9;
ws.on('error',(err)=>{
    console.log(err);
});
function write(){
    let flag = true;
    while(flag && n>0){
        flag = ws.write(n+'','utf8',()=>{
            console.log('ok');
        });
        n--;
        console.log(flag);
    }
}
//监听drain 事件
ws.on('drain',()=>{
    console.log('drain');
    write();
})
write();