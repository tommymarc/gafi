let fs = require('fs');
let path = require('path')
/**
 * 异步的先序深度优先遍历
 *      a
 *     /  \
 *    b    c   h.txt
 *   / \  /\
 *  d  e f  g
 **/
function preDeep(dir,callback){
    // return new Promise()
    console.log(dir);
    fs.readdir(dir,(err,files)=>{
        //异步就不能写循环了
        !function next(i){//自定义函数
            if(i>=files.length) return callback();//如果已经越界了，就回调callback()
            let child = path.join(dir,files[i]);
            fs.stat(child,(err,stat)=>{
                if(stat.isDirectory()){
                    //如果子目录也是一个文件夹，就要递归子文件夹
                    preDeep(child,()=>next(i+1));//遍历i+1
                }else{
                    console.log(child);
                    next(i+1);
                }
            })
        }(0);
    })

}
preDeep('a',()=>{
    console.log('全部迭代完毕');
});