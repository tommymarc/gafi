/**
 * 1. 生成器Generator与 迭代器Iterator
 * 生成器函数与普通函数不一样,返回迭代器
 * 执行的时候也不一样，中间可暂停(类似高速服务区)
 * 生成器函数其实是内部分割成了很多个小函数 块
 **/
function * read(books){
    console.log('开始');
    for(let i=0; i<books.length;i++){
        //yield为分割函数执行点
        yield books[i];//yield 放弃屈服 产出
    }
    console.log('结束');
}

let it = read(['js','node']);
/*
let r1 = it.next();
console.log(r1); //{value:'js' ,done:false}
let r2 = it.next();
console.log(r2); //{value:'node' ,done:false}
let r3 = it.next();
console.log(r3); //{ value: undefined, done: true }
 */

let result ;
do{
   result = it.next();
    console.log(result);
}while(!result.done);
