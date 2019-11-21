let fs = require('fs');
fs.readFile('./1.txt',function(err,data){
    console.log(data);
    if(data[0] == 0xef && data[1] == 0xbb && data[2] == 0xbf){
        data = data.slice(3);
    }
    console.log(data.toString());
});

// GBK  转 UTF8
let iconv = require('iconv-lite');
fs.readFile('./1.txt',function(err,data){
    //Unknown encoding: gbk
    // console.log(data.toString('gbk'));
    //实现转码操作，把一个GBK编码的Buffer 转变成UTF8字符串
    let str = iconv.decode(data,'gbk');
    console.log(str);
})