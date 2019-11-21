const express = require('../lib/express');
const path = require('path');
const app = express();
const fs = require('fs');

app.get('/',function(req,res){
    console.log(req.query);
    console.log(req.query);
    // res.end('ok');
    //end 里面不能放对象，end只能放字符串或者buffer
    //用json 来返回对象给客户端
    res.json({name:'xxxx'});

})
app.listen(3000);