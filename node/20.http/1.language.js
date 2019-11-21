/**
 * 多语言
 * @type {module:http}
 */
//Accept - Language: zh-CN,zh;q=0.9
let http = require('http');
let server = http.createServer(request);
server.listen(8080);
//多语言语包
const lanPack = {
    en:{//英文访问
        title:'welcome'
    },
    zh:{//中文访问
        title:'欢迎光临'
    },
    default:'en'
}
function request(req,res){
    //实现服务器和客户端的协议，选择客户端最想要的，并且服务器刚好有的
    //Accept - Language: zh-CN, zh;q=0.9, en;q=0.8, jp;q=0.7
    //[{lan:'zh-CN',q:1},{lan:'zh',q:1}]
    let acceptLanguage = req.headers['accept-language'];
    if(acceptLanguage){
        //用 , 隔开每种语言，并且获得数组item
        //['zh-CN' , 'zh;q=0.9' , 'en;q=0.8', 'jp;q=0.7']
        const lans = acceptLanguage.split(',').map(function(item){
            //[['zh-CN'] , ['zh','q=0.9'] , ['en','q=0.8'], ['jp','q=0.7']]
            let values = item.split(';');
            let name = values[0];//语言 'zh-CN'
            //['q','0.9'] 可能有可能没，没有的话 给q=1 ， 有的话直接获取
            let q = values[1]?parseFloat(values[1].split('=')[1]) : 1;
            return{
                name,q
            }
        }).sort((a,b)=>b.q-a.q);//排序 b-a降序，从大到小
        let lan =lanPack.default;//默认语言
        // console.log(lan)
        for(let i=0; i<lans.length; i++){
            //如果此语言在语言包里有值，那么就使用此语言了
            if(lanPack[lans[i].name]){
                lan =lans[i].name;
                break;

            }
        }
        res.end(lanPack[lan].title);
    }

}
