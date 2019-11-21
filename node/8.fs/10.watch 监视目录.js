/**
 * 监视文件的变化，当文件发生变化之后执行对应回调函数
 * prevStat 修改前的状态，newStat 修改后的状态
 **/
let fs = require('fs');

//stat 是一个对象 是fs.Stat 对象
fs.watchFile('a.txt',function(newStat,prevStat){
    // console.log(arguments);
    if(Date.parse(prevStat.ctime) == 0){
        console.log('这个文件是新增加的')
    }else if(Date.parse(prevStat.ctime) != Date.parse(newStat.ctime)){
        console.log('文件被修改了');
    }else {
        console.log('删除了');
    }
});
