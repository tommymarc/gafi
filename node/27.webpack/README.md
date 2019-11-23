##1.webpack4 实战 
##2.优化 
##3.源码
##4.自己的webpack

1.什么是webpack
    - webpack 可以看作是模块打包机，它做的事情是，分析项目结构，找到javascript模块以及其他的一些浏览器不能直接运行的拓展语言(scss,typeScript等)，并将其打包为合适的格式以供浏览器使用
    - 构建就是把源代码转换成发布到线上的可执行Javascript、css、html代码，包括：
        - 代码转换：TypeScript 编译成JavaScript、Scss编译成css
        - 文件优化：压缩javascript、css、html代码，压缩并且合并图片等
        - 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载
        - 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器
        - 模块合并：在采用模块化的项目里会有多个模块和文件，需要构建功能把模块分类合并成一个文件
        - 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过
        - 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统
    - 构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。
    - 构建给前端开发注入了更大的活力，解放了我们的生产力