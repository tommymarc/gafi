//express 结构原理
let stack = [
    function(next){
        console.log(1);
        next();
    },
    function(next){
        console.log(2);
    }
]

let i = 0;
function next(){
    let fn = stack[i++];
    fn(next);
}
next();

//koa 原理

function first(){
    console.log('first start');
    function second(){
        console.log('second start');
        function third(){
            console.log('third start');
            console.log('third end');
        }
        third();
        console.log('second end');
    }
    second();
    console.log('first end');
}
first();