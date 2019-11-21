let ReadStream = require('./7.ReadStream');
let WriteStream = require('./6.WriteStream');
let rs = new ReadStream('./1.txt',{
    start:3,
    end:8,
    highWaterMark:3
});
let ws = new WriteStream('./2.txt',{
    highWaterMark:3
});
//读-写建立管道
rs.pipe(ws);
