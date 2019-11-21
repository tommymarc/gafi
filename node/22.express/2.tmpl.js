let str = `
    <%if(user){%>
        hello <%=user.name%>
        <%}else{%>
        hello gust
        <%}%>
        <ul>
        <%for(let i=0;i<total;i++){%>
            <li><%=i%></li>
        <%}%>
        </ul>
`;
//with 对象作用域

//ejs 它的原理就是拼出一段函数体代码，然后吧obj作为作用域变量提供属性
let options = {
    user:{name:'xxx'},
    total:5
};

function render(str,options){
    let head = "let tpl = '';\n with(obj){\n tpl+=`";
    // \s 空字符  \S 非空字符  \s\S 合集
    str = str.replace(/<%=([\s\S]+?)%>/g,function(){
        return "${"+arguments[1]+"}";
    });
    str = str.replace(/<%([\s\S]+?)%>/g,function(){
        return "`;\n" + arguments[1] + "\n;tpl+=`";
    });

    let tail = "`}\n return tpl;";
    let html = head + str + tail;
    console.log(html);
    let fn = new Function('obj',html);
    return fn(options);
}

/*
let ejs = require('ejs');
function render(str,options){
    return str.replace(/<%(w+?)%/g,function(){
        return options[arguments[1]];
    });
}*/
let result = render(str,options); // hello xxx
console.log(result)

//在JS有三种作用域  全局作用域  函数作用域 with作用域