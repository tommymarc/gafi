let argv = {};
let args = process.argv;
//args 是一个数组 循环数组
//node 2.hello.js  --name  xia
for(let i=2; i<args.length;i++){
    let val = args[i];
    if(val.startsWith('--')){
        argv[val.slice(2)] = args[++i]
    }
}




exports.argv = argv;
//导出的对象属性等于对象属性