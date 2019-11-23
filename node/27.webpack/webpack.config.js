const path =require('path');
//配置文件
//webpack 内部有一个时间流，tapable 1.0
module.exports = {
    //入口
    entry:'./src/index.js',
    //输出
    output:{
        path:path.join(__dirname,'dist'),//输出的文件夹，只能是绝对路径
        filename:'bundle.js',   //打包后的文件名
    },
    //处理规则
    module:{

    },
    //插件
    plugins:[

    ]

}