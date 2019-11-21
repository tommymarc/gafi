let fs = require('fs');
let path = require('path');

fs.readdir('./a',function(err,files){
    console.log(files);//['b','c']
    files.forEach(file=>{
        // 统一信息的意思
        let child = path.join('a',file);
        console.log(child);// a/b
        fs.stat(child,function(err,stat){
            // console.log(stat);//描述对象的详细信息
        })
    })
});
