
let util = require('util');
let obj = {name:'xxx',home:{
    city:{name:'beijing'}
    }
};
console.log(obj);
//控制层级
console.log(util.inspect(obj,{depth:1})); //{ name: 'xxx', home: { city: [Object] } }
console.log(util.inspect(obj,{depth:2})); //{ name: 'xxx', home: { city: { name: 'beijing' } } }


