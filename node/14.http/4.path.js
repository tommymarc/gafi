/**
 * 处理文件名字
 * @type {module:path}
 * path.basename()   拿到路径中文件的全名
 * path.basename(path,'.jpg')   拿到文件名
 * path.extname(path,'.jpg')   拿到文件后缀名
 *
 * cwd  当前工作目录，是可变的  可以通过process.chdir()来改变
 * __dirname  要执行的脚本确定了，它所在的目录就确定了，不可能改变
 */

let path = require('path');
let str = '/a/b/c/a.jpg';
console.log(path.basename(str)); //a.jpg
console.log(path.basename(str,'.jpg')); //a
console.log(path.extname(str,'.jpg')); // .jpg

