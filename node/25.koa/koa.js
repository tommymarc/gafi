class Koa{
    constructor(){
        //构造函数 保存中间件函数
        this.middleware = [];
    }
    use(fn){
        this.middleware.push(fn)
    }
    listen(port){
        let middleware = this.middleware;
        require('http').createServer((req,res)=>{
            let ctx = {req,res}
            //koa2.0 3.0 原理
            /*dispatch(0);
            function dispatch(index){
                middleware[index](ctx,()=>next(index+=1));
            }*/
            //绑定,reduceRight 从右往左计算
            //[1,2,3]
            /*let fn = middleware.reduceRight((val,item)=>{
                //第一次执行  item为3
                //第二次执行  item为2
                //第三次执行  item为1
               return  val = item.bind(null,ctx,val);
            },function(){});
        fn();*/
            //自动执行，koa1.0原理
            (middleware.reduceRight((val,item)=>{
                //第一次执行  item为3
                //第二次执行  item为2
                //第三次执行  item为1
                return  val = item.bind(null,ctx,val);
            },function(){}))()

        }).listen(port);
    }
}

module.exports = Koa;