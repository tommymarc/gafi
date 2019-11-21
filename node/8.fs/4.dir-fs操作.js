//如何创建目录
let fs = require('fs');

/**
 * 当创建目录的时候，必须要求父目录是存在的
 */
/*
fs.mkdir('a',function(){
    console.log(err);
});
 */

/**
 * 判断一个文件或目录 是否存在 fs.exists
**/
/*
//fs.constants.R_OK 判断目录是否有读取R 的权限
fs.access('a',fs.constants.R_OK,function(err){
    console.log(err);
})
 */

/**
 * 递归异步创建目录
 */

function mkdirp(dir){
    //首先分割字符串
    let paths = dir.split('/');//[a,b,c]
    // console.log(paths);
    !function next(index){
        if(index > paths.length) return;
        let current = paths.slice(0,index).join('/'); //当前目录
        console.log(current); //a
        fs.access(current,fs.constants.R_OK,function(err){
            if(err){
                fs.mkdir(current,0o666,()=>next(index+1));
                // fs.mkdir(current,0o666,next.bind(null,index+1));
                console.log(err);
            }else{
                next(index+1);
                // console.log(fs.constants.R_OK);
            }
        })
    }(1);
}
// mkdirp('a/b/c');


// fs.mkdir('a/b/c/d',function(err){
//     console.log(err);
// });

/**
 *truncate  截断文件
 * 1234567890
 **/
fs.truncate('./1.txt',5,()=>{//12345
    console.log('截断文件');
})