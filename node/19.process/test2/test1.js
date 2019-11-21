// for(let i = 2; i <process.argv.length; i++){
//     // 从2开始 直接返回a b c
//     process.stdout.write(process.argv[i] + '\r\n');
// }
let i = 0;
let timer = setInterval(function(){
    if(++i < 10){
        process.stdout.write('1')
    }else{
        clearInterval(timer);
    }
},1000);
process.on('SIGTERM',function(){
    console.log(arguments);
})