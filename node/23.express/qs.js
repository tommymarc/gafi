//querystring  qs 区别
//querystring 不支持内嵌对象
//qs 支持内嵌子对象
let querystring = require('querystring');
let qs = require('qs');
let obj = {name:'xxx',home:{address:'beijing'}};
let r = querystring.stringify(obj);
let r2 = qs.stringify(obj);
console.log(r);//name=xxx&home=
console.log(r2);//name=xxx&home%5Baddress%5D=beijing