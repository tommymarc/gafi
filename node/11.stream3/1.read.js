let fs = require('fs');
let rs = fs.createReadStream('./1.txt',{
    start:0,
    end:8,
    highWaterMark:3
});
rs.on('data',function(data){
    console.log(data);
});
rs.on('end',function(){
    console.log('end');
});
rs.on('err',function(err){
    console.log(err);
});
rs.on('open',function(){
    console.log('open');
});
rs.on('close',function(){
    console.log('close');
})
