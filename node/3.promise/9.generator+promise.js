
let fs = require('fs');
// let co = require('co');

function readFile(filename){
    return new Promise(function(resolve,reject){
        fs.readFile(filename,'utf8',function(err,data){
            err?reject(err):resolve(data);
        });
    })
}
//*read生成器
function *read(){
    console.log('开始');
    let a = yield readFile('1.txt');
    console.log(a);
    let b = yield readFile('2.txt');
    console.log(b);
    let c = yield readFile('3.txt');
    console.log(c);
    return c;
}


//tj 库
//co 是用来帮我们自动执行迭代器的
co(read);
//co是一个函数，返回的promise
function co(gen){ //用co 包一个 gen 生成器
    let it = gen(); //执行。返回迭代器
    //要让生成器持续执行
    return new Promise(function(resolve,reject){
        !function next(lastVal){  //让next()函数自执行
              let {value,done} = it.next(lastVal);
              if(done){ // 如果done 为 true 就迭代完成
                  resolve(value);
              }else{
                  value.then(next,reject); //promise如果成功了，就会把成功的value 传给next （lastVal）
              }
        }()
    });
}


/**
//调用生成器，返回迭代器
let it = read();
let r1 = it.next(); //promise1
console.log(r1); // {value: Promise{ <pending> } , done:false }  {value: promise1  , done:false }
r1.value.then(function(data){ //data 就是文本1的内容
    let r2 = it.next(data); // promise2  {value: promise2  , done:false }
    r2.value.then(function(data){
        let r3 = it.next(data);// promise3  {value: promise3  , done:false }
        r3.value.then(function(data){
            let r4 = it.next(data);// promise4 {value: promise4  , done:false }
            console.log(r4); //{value: '这是文本3'  , done:false }
        })
    })
})
 */