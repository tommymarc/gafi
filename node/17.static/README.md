## 静态文件服务器
可以在任意目录下启动一个静态文件服务器，并且把当前目录作为静态文件根目录
````
zf-server -d 指定静态文件根目录 -p 指定端口号 -o 指定监听的主机
```
初始化node 拿到package.json 文件
npm init -y

npm i chalk -S     //粉笔颜色
npm i debug -S     //调试   export DEBUG=static
npm i supervisor - g  //管家，可自动重启服务器 -g全局安装
npm install --save handlebars //语义化模版