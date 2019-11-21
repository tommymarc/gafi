/**
 * 流的用法
 **/
/*
let fs = require('fs');
fs.readFile('./1.txt',function(err,data){
    console.log(data);
})
*/
let LineReader = require('./5.LineReader');
let reader = new LineReader('./1.txt','utf8');
reader.on('newLine',data=>{
    console.log(data);
});
reader.on('end',()=>{
    console.log('over');
})