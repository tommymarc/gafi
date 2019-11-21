/**
 * 1.如何把一个unicode码 转成utf-8编码
 * 穿进去一个unicode码，返回一个utf8编码
 *      Unicode 符号范围    |   utf-8
 *      （十六进制）        |    (二进制)
 * 0000 0000 - 0000 007F   |  0xxxxxxx
 * 0000 0080 - 0000 07FF   |  110xxxxx 10xxxxxx
 * 0000 0800 - 0000 FFFF   |  1110xxxx 10xxxxxx 10xxxxxx
 * 0001 0000 - 0010 FFFF   |  11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
 *
 * 万 4E07 (16进制)
 **/

//UTF-8是Unicode 一种存储方式，是一种实现
//0x 16 进制
//所有汉子都是三个字节
//进制只是一个数字的表示方法
let r = transfer(0x4E07);
//转成二进制R
let b = parseInt(0x4E07.toString(2));
console.log(b); //100111000000111
// 1110xxxx 10xxxxxx 10xxxxxx
// 11100100 10111000 10000111
console.log(0b11100100.toString(16));//e4
console.log(0b10111000.toString(16));//b8
console.log(0b10000111.toString(16));//87
console.log(Buffer.from('万'));//<Buffer e4 b8 87>

function transfer(number){
    /**
     * 1.要判断0x4E07 有几个字节，在哪个范围内
     *  - 如果在第一个范围内，则用一个字节
     * @type {*[]}
     */
    var arr = [];
    let str = number.toString(2);
    if(number<0x7F){
        //0xxxxxxx
        arr = ['0']
        arr[0] += number.toString(2).padStart(7,0);
        console.log('number<0x7F');
    }else if(number<0x7FF){
        //110xxxxx 10xxxxxx
        arr = ['110','10'];
        arr[1] += str.substring(str.length-6);
        arr[0] += str.substring(0,str.length-6).padStart(5,0);
        console.log('number<0x7FF');


    }else if(number<0xFFFF){
        //1110xxxx 10xxxxxx 10xxxxxx
        arr = ['1110','10','10'];
        arr[2] += str.substring(str.length-6);
        arr[1] += str.substring(str.length-12,str.length-6);
        arr[0] += str.substring(0,str.length-12).padStart(4,0);//用0补齐4位
        console.log('number<FFFF');
    }else if(number<0x10FFFF){
        console.log('我醉了')
    }
    /*
    let arr = ['1110','10','10'];//三个字节的前缀定死的
    let str = number.toString(2);//100 111000 000111
    arr[2] += str.substr(-6);
    //arr[2] += str.substring(str.length-6);
    arr[1] += str.substr(-12,6);
    //arr[1] += str.substring(str.length-12,str.length-6);
    arr[0] += str.substr(0,4).padStart(4,0);//用0补齐4位
    // arr[0] += str.substring(0,str.length-12).padStart(4,0);//用0补齐4位
    */
    let  result = arr.join('');
    return parseInt(result,2).toString(16);
    // return arr.map(item=>parseInt(item,2).toString(16));
}

let r2 = transfer(0x4eFF);
console.log(r2);


//0x07FF 如何转成10进制
console.log(0x07FF);
console.log(parseInt('0x07FF', 16));
//7FF
console.log(15+15*16+7*16**2);

