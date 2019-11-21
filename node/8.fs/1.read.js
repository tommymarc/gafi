/**
 * fs核心模块来读写文件
 *
 * flags
 *   符号       含义
 *   r     ｜ 读文件，文件不存在报错
 *   r+    ｜ 读取并写入，文件不存在报错
 *   rs    ｜ 同步读取文件并忽略缓存
 *   w     ｜ 写入文件，不存在则创建，存在则清空
 *   wx    ｜ 排他写入文件
 *   w+    ｜ 读取并写入文件，不存在则创建，存在则清空
 *   wx+   ｜ 和w+类似，排他方式打开
 *   a     ｜ 追加写入
 *   ax    ｜ 与a类似，排他方式写入
 *   a+    ｜ 读取并追加写入，不存在则创建
 *   ax+   ｜ 作用与a+类似，但是以排他方式打开文件
 *
 *   助记
 *   r  读取
 *   w  写入
 *   s  同步
 *   +  增加相反操作
 *   x  排他方式
 *   r+ w+的区别
 *     - 当文件不存在时，r+不会创建，而会导致调用失败，但w+会创建
 *     - 如果文件存在，r+不会自动清空文件， 但w+会自动把已有文件的内容清空
 *
 * linux 权限
 *   - 文件类型与权限  连接占用的字节(i-node)  文件所有者  文件所有者的用户组  文件大小  文件的创建时间  最近修改时间  文件名称
 **/

let fs = require('fs');
/*
//异步的，没有返回值，有回调
fs.readFile('./1.txt',{encoding:'utf8',flag:'r'},function(err,data){
    if(err){
        console.log(err+'readFile');
    }else{
        //在硬盘中存储的都是二进制
        // 1. tostring 转换
        // 2. 加参数 encoding:'utf8'
        // 3. flag 你将要对这个文件进行追加何等操作 :读、写、追加、删除
        console.log(data + 'readFile');//<Buffer 31 32 33 34 35 36 37 38 39 30>
    }
});
 */

/**
//mode:0o666  :666  linux 权限位
//chmod  改变权限  777 可读可写可执行
//编码 encoding  是在要写入的字符串转成Buffer 二进制的时候用的
fs.writeFile('./2.txt','data',{encoding:'utf8',flag:'a',mode:0o666},function(err){
    // console.log(err);
});

//不需要手工写flag:'a'
fs.appendFile('./2.txt','data',function(err){
    // console.log(err);
});
**/

/* readFile  writeFile appendFile
 他们都是把文件当成一个整体来操作的
 问题：当文件特别大，大于内存的时候是无法执行这样的操作的
 希望：能精确的读取某段字节
 */
/*
//0 对应标准输入  1 标准输出   2 错误输出
process.stdin.on('data',function(data){
    console.log(data);
});
console.log('标准输出');
//process.stdout.write('标准输出');
console.error('错误输出')；
 //process.stderr.write('错误输出');
 */

/*
//fd : file dispcriptor  文件描述符
fs.open('./1.txt','r',0o666,function(err,fd){
    console.log(fd + 'open'); //23
    let buff =Buffer.alloc(4);
    //精确读取文件  fd,buffer,offset,length,position,callback
    //fd : 命名符
    //buffer : 文件内容容器
    //offset : 读取Buffer 偏移量
    //length : 从文件中读取几个字节
    //position : 文件的读取位置索引 (可不给，不传、'null'表示当前位置)
    //callback : 回调函数
    fs.read(fd,buff,0,3,null,function(err,bytesRead){
        console.log(buff.toString()+'buff'); // [1,2,3]
        let buff2 = Buffer.alloc(4);
        fs.read(fd,buff2,0,3,null,function(err,bytesRead){
            console.log(buff2.toString()+'buff2');// [4,5,6]
        })
    });

});
 */

//'w' 清空并写入

fs.open('./2.txt','r+',0o666,function(err,fd){
    console.log(fd);
    //精确写入文件 fd,buffer,offset,length,position,callback
    //fd : 命名符
    //buffer : 文件内容容器
    //offset : 读取Buffer 偏移量
    //length : 从文件中读取几个字节
    //position : 文件的写入位置索引 (可不给，不传、'null'表示当前位置)
    //callback : 回调函数
    fs.write(fd,Buffer.from('夏天'),3,3,6,function(err,bytesWritten){
        console.log(err);
        console.log(bytesWritten);
    });
})


