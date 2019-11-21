let fs = require('fs');
let buf = Buffer.alloc(1024*1024*256,8);
// fs.writeFileSync(path.join(__dirname,'1.test'),buf);
fs.writeFileSync('./1.test',buf);
