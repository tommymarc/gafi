/**
 * 为了保证程序执行一致性的可测试性
 **/
let cache;
setTimeout(function(){
    !function set(){
        cache = 100;//同步
        /* setTimeout(function(){//异步
             cache = 100;
         })
         */
    }();
})

console.log(cache);//undefined