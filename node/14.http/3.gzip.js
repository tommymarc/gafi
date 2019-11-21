let zlib = require('zlib');
let str = 'hello';
zlib.gzip(str,(err,buffer)=>{
    console.log(buffer.length);//查看压缩字节数
    zlib.unzip(buffer,(err,data)=>{
        //data即 压缩的数据
        console.log(data.toString());//hello
    })
});

