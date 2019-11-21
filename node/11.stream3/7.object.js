//对象流
let {Transform} = require('stream');
let fs = require('fs');
let rs = fs.createReadStream('./user.json')
//普通流里面放的是Buffer， 对象流里面放的是对象
let toJSON = Transform({
    //可读流放对象模式
    readableObjectMode:true, //就可以向可读流里放对象了
    transform(chunk,encoding,cb){
        console.log(chunk); //打印全部都是buffer
        //向可读流里的缓存区里放东西，不能直接放对象
        this.push(JSON.parse(chunk.toString()));
    }
});
let outJSON = Transform({
    writableObjectMode:true,//既可以向可写流里面写入对象了
    transform(chunk,encoding,cb){
        console.log(chunk);
    }
});
//toJSON 为rs 的可写流
// rs.pipe(toJSON);
//outJSON为rs.pipe(toJSON)的可写流
rs.pipe(toJSON).pipe(outJSON);