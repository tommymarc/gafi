let fs = require('fs');
function render(filepath, options ,callback){
    fs.readFile(filepath,'utf8',function(err,str){
        let head = "let tpl = ''\n with(obj){\n tpl+='";
        str = str.replace(/<%=([\s\S]+?)%>/g,function(){
            return "${" + arguments[1] + "}";
        });
        str = str.replace(/<%([\s\S]+?)%>/g,function(){
            return ";\n" + arguments +"\n;tpl+='";
        });
        let tail = "'}\n return tpl";
        let html = head + str + tail;
        let fn = new Function('obj',html);
        let result = fn(options);
        callback(null,result);
    })
}

module.exports = render;