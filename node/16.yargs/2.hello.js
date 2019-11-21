/**
 *
 * @type {*|Argv}
 * mac 需要设置权限
 * 1 chmod +x mac
 * 2 #！/usr/bin/env
 */
/*
let yargs = require('yargs');
//可以帮我们解析命令行参数，把参数数组变成对象的形式
let argv = yargs.argv;
console.log('hello',argv.name);

 */
let yargs = require('yargs');
let argv = yargs.options('n',{
    alias:'name',  //别名
    demand:true, //必填
    default:'xia',
    description:'请输入你的姓名'
})
    .usage('hello [option]')
    .help()  //指定一个帮助命令信息
    .alias('h','help')  //指定用法的一个描述，该如何用
    .example('hello --name xia','执行hello命令，然后传入name参数为xia')
    .argv;
console.log(argv);

console.log('hello'+ argv.name);
