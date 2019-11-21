let path = require('path');
//连接两个目录

console.log(path.join('a', 'b'));
console.log(__filename);
//resolve 从当前路径出发，解析出一个绝对路径
//..   代表上级目录
//.    代表当前目录
// 字符串 a 代表当前目录下面的a目录
console.log(path.resolve('..', '.', 'a'));

//因为在不同的操作系统，分割符不一样
//环境变量路径分割符
console.log(path.delimiter); // ' : '        mac
console.log(path.win32.delimiter); // ' ; '  windows
console.log(path.posix.delimiter); // ' : '  linux
//文件路径分割符
console.log(path.sep);      //  ' / '          mac
console.log(path.win32.sep);      //  ' \ '    windows
console.log(path.posix.sep);      //  ' / '    linux

//path.relative  获得两个路径之间的相对路径
//path.basename  获取文件名
console.log(path.basename('aa.jpg','.jpg')); //aa
console.log(path.basename('aa.jpg',));      //aa.jpg
//extname        获取文件的扩展名
console.log(path.basename('aa.jpg'));       //aa.jpg