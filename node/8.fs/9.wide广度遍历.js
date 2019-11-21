/**
 * 同步广度的优先先序遍历
 * a -> b ->c  ->h.txt   ->d -> e -> f -> g
 **/
let fs = require('fs');
let path = require('path');

function wide(dir){
    // console.log(dir);
    // 构建一个数组，开始只有元素 a
    let arr = [dir]; //a
    // 长度是否大于0
    while(arr.length>0){
        //取出队列最左边的元素 a
        let current = arr.shift();
        console.log(current);
        //拿到current的值，判断是文件还是目录
        let stat = fs.statSync(current);
        //如果是目录的话
        if(stat.isDirectory()){
            //拿到dir的所有子目录
            let files = fs.readdirSync(current);
            //遍历子目录
            files.forEach(item=>{
                //把子目录item  push()到数组队列的最后面
                arr.push(path.join(current,item));
            })
        }
    }

}
wide('a');
