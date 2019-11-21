/**
 * 我们可以通过代码来进入repl创建一个repl环境
 **/

let repl = require('repl');
//context 上下文，就是它支持时的环境，repl可以从环境中拿到一些变量或者属性
let context = repl.start().context;
context.msg = 'hello';
context.hello = function(){
    console.log(context.msg);
}

/**
 * .break   当你不想在写的时候，可以结束当前作用域的编写
 * .clear   类似于.break
 * .exit    退出当前repl
 * .help    查看帮助
 * .save    存储当前脚本 （.save 1.log）
 * .load    读取历史脚本 （.load 1.log）
 **/