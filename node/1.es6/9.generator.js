/**
 * 生成器(Generator) 与迭代器(Iterator)
 * 它是理解koa的基础，另外也是现代异步解决方案async await的基础
 **/
/**
 *read生成器  用来生成迭代器
 */
function read(books){
    let index = 0;
    return {
        //迭代器
        next(){
            //容器内东西已经取完
            // let done = index == books.length-1;
            //容器内的东西
            // let value = books[index++];

            let done =index ==books.length;
            //只要能取到值done就为false，取不到值就为true
            let value = done?undefined :books[index++];
            return {
                value,
                done
            }
        }
    }
}

//迭代器Iterator : 容器内存有很多东西，我们需要迭代出来
//迭代器可以不停的调用next方法得到一个{vale,done}的结果
//当done为true的时候就表示取完了
let it = read(['js','node','mysql','vue']);
//it又一个方法叫next，哪次调用next都会返回一个结果{value,done}
/*
let r1 = it.next();
console.log(r1);
let r2 = it.next();
console.log(r2);
 */
let result;
do{
    result = it.next();
    console.log(result);
}while(!result.done);

