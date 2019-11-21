/**
 * 递归删除非空目录
 **/
let path = require('path');
let fs = require('fs');
/**
//获取一个目录下面的所有文件或目录
fs.readdir();

//删除一个文件
fs.unlink(path);
fs.unlinkSync(path)；

//删除一个空目录
fs.rmdir('a');
fs.rmdirSync(path);

 **/

/**
 * 递归同步删除非空目录
 * @param dir
 */

function rmdirp(dir){
    let files = fs.readdirSync(dir);
    files.forEach(function(file){
        let current = dir+'/'+file;
        let child = fs.statSync(current);
        //判断 是文件还是目录
        if(child.isDirectory()){
            rmdirp(current)
        }else{
            fs.unlinkSync(current);
        }
    });
    //如果把一个目录下面所有的文件或目录 全部删除后 要删除自己
    fs.rmdirSync(dir);
}
// rmdirp('a');
/*
function rmdirSync(dir){
    let files = fs.readdirSync(dir);
    files.forEach(item=>{
        //得到文件的详情
        //dir 父目录， item 子目录， join 加在一起
        let child = fs.staSync(path.join(dir,item));
        //如果child 是一个文件夹，就递归删除此文件夹
        if(child.isDirectory()){
            rmdirSync(path.join(dir,item));
        }else{//如果是一个文件就直接删除
            fs.unlinkSync(path.join(dir,item));
        }
    });
    fs.rmdirSync(dir);
}
rmdirSync('a');
 */

/**
 * 递归异步删除非空目录
 **/



function rm(dir){
    return new Promise(function(resolve,reject){
        fs.stat(dir,function(err,stat){
            if(err) return reject(err);
            if(stat.isDirectory()){
                fs.readdir(dir,function(){
                    Promise.all(files.map(file=>{
                        rm(path.join(dir,file))
                    })).then(()=>{
                        fs.rmdir(dir,resolve);
                    })
                })
            }else{
                fs.unlink(dir,resolve);
            }
        })
    })
}

/**
 * 1. return new Promise(); 返回一个promise
 * 2. fs.stat();     判断dir的类型
 * 3. fs.readdir()； 拿到下面的文件夹
 * 4. Promise.all(); 删除当前目录下的所有子文件夹或文件
 * 5. .then();   删除目录
 */
function rmdir(dir){
    return new Promise(function(resolve,reject){
        fs.stat(dir,(err,stat)=>{
            if(err)return reject(err);
            if(stat.isDirectory){
                fs.readdir(dir,(err,files)=>{//[ ]
                    if(err) return reject(err);
                    //先删除当前目录的子文件夹或文件，再删除自己
                    Promise.all(files.map(item=>rmdir(path.join(dir,item))))
                        .then(()=>{
                            fs.rmdir(dir,resolve);
                        })
                });
            }else{
                fs.unlink(dir,resolve);
            }
        })


    });
}
rmdir('a').then(data=>{
    console.log(data);
},function(err){
    console.log(err);
});


/*
function deleteDirectory(dirPath){
    return new Promise((resolve,reject)=>{
        fs.access(dirPath,err=>{
            if(err)reject(err)
            fs.readdir(dirPath,(err,files)=>{
                if(err)reject(err)
                Promise.all(files.map(file=>{
                    return deleteFile(dirPath,file)
                })).then(()=>{
                    fs.rmdir(dirPath,err=>{
                        if(err)reject(err)
                        resolve()
                    })
                }).catch(reject)
            })
        })
    })
}

function deleteFile(dirPath,file){
    return new Promise((resolve,reject)=>{
        let filePath = path.join(dirPath,file)
        fs.stat(filePath,(err,stats)=>{
            if(err)reject(err)
            if(stats.isFile()){
                fs.unlink(filePath,err=>{
                    if(err)reject(err)
                    resolve()
                })
            }else{
                //返回deleteDirectory在all中递归调用
                resolve(deleteDirectory(filePath))
            }
        })
    })
}
*/
