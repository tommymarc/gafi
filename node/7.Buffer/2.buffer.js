
// let buf1 = Buffer.from('夏');
// let buf2 = Buffer.from('天')

Buffer.prototype.copy2 = function(targerBuffer,targetStart,sourceStart,sourceEnd){
    for(let i =sourceStart;i<sourceEnd;i++){
        tragetBuffer[targetStart++] = this[i]
    }
}
// buf1.copy2(buf2,0,0,3);
// console.log(buf2.toString());

//concat连接buffer
let buf3 = Buffer.from('夏');
let buf4 = Buffer.from('天');
Buffer.concat2 = function(list,total=list.reduce((len,item)=>len+item.length,0)){
    if(list.length == 1){
        return list[0];
    }
    //Buffer 是固定长度的
    let result = Buffer.alloc(total);
    let index = 0;
    for(let buf of list){
        for(let b of buf){
            if(index>total){
                return result;
            }else{
                result[index++] = b;

            }

        }
    }
    return result;
}
// let result = Buffer.concat([buf3,buf4],5);//最后参数 5 给了就是给定的长度 ； 不给就是默认长度
let result = Buffer.concat2([buf3,buf4]);//e5 a4 8f e5 a4 a9
console.log(result.toString());
console.log(result);

