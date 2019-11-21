const express = require('../lib/express-mini');
const app = express();
app.get('/',function(req,res){
    res.end('hello');
});
app.listen(3000,function(){
    console.log('server started in 3000')
});