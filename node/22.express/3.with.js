// let obj = {name:'xxx',age:9,number:5 };
//with 会形成一个作用域，里面的作用对象会从this来取
//在with作用域里，变量名可以从obj的属性上取值
/*with(obj){
    console.log('hello '+name);
    for(let i = 0;i<number;i++){
        console.log(i)
    }
}*/
//value object / 值对象 / 作用域链 / 执行上下文栈 / 运行上下文对象

let str = `
    <%if(user){%>
        hello <%=user.name%>
        <%}else{%>
        hello gust
        <%}%>
`;

let obj = {user: {name:'xxx'} };

let script = `
let tpl ="";
with(obj){
if(user){
    tpl += "hello cc"
            }else{
    tpl += "hello guest";
    }
}
return tpl;
`;
let fn = new Function('obj',script);
let result = fn(obj);
console.log(result);