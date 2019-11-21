let url = require('url');
let str = 'http://localhost:8080/user?id=5#top';
//如果第二个参数为true，那么query就是一个对象了
//  query: 'id=5',
//  query: [Object: null prototype] { id: '5' },
let urlObj = url.parse(str,true);

// console.log(urlObj);
console.log(url.format(urlObj));//http://localhost:8080/user?id=5#top