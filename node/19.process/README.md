##1.进程
  - 在Node.ks中每个应用程序都是一个进程类的实例对象
  - 使用process 对象代表应用程序，这是一个全局对象，可以通过它来获取Node.js应用程序以及运行该程序的用户、环境等各种信息的属性、方法和事件
  1.1进程对象的属性
   - execPath 可执行文件的绝对路径，如 /usr/local/bin/node
   - version 版本号
   - versions 依赖库的版本号
   - platform 运行平台。 如darwin、freebsd、linux、sunos、win32
   - stdin 标准输入流可读流，默认暂停状态
   - stdout 标准输出可写流，同步操作
   - stderr 错误输出可写流，同步操作
   - argv 属性值为数组
   - env 操作系统环境信息
   - pid 应用程序进程ID
   - title 窗口标题
   - arch 处理器架构 arm ia32 x 64
   # process.stdin.resume();
     process.stdin.on('data,function(chunk){
        process.stdout.write(`进程接收到的数据: `+chunk);
     });
     process.argv.forEach((val,index,ary)=>console.log(index,val));
     
   1.2 memoryUsage 方法
     process.memoryUsage()
     stack
      - rss(resident set size ): 所有内存占用，包括指令区和堆栈
      - heapTotal: '堆'占用的内存，包括用到的和没用到的。
      - heapUsed: 用到的堆的部分
      - external: V8引擎内部的C++对象占用的内存
   1.3 nextTick 方法
     nextTick 方法用于将一个函数推迟到代码中所书写的下一个同步方法执行完毕或异步方法的回调函数开始执行前调用
   1.4 chdir
     chdir 方法用于修改Node.ks应用层续重使用的当前工作目录，使用方式如下
       process.chdir(directory);
   1.5 cwd 方法
     cwd 方法用于返回当前目录，不使用任何参数
   1.6 chdir 方法
     改变当前的工作目录
       console.log(`当前目录：${process.cwd()}`);
       process.chdir('..');
       console.log(`上层目录: ${process.cwd()}`);
   1.7 exit 方法
     退出运行Node.js应用程序的进程
       process.exit(0);
   1.8 kill 方法
     用于向进程发送一个信号
       - SIGINT 程序终止(interrupt)信号，在用户键入INTR字符(通常是Ctrl-C)时发出，用于通知前台进程组终止进程
       - SIGTERM 程序结束(terminate)信号，该信号可以被阻塞和处理。通常用来要求程序自己正常退出，shell命令kell缺省产生这个信号
        procee.kill(pid,[signal]);
          - pid是一个证书，用于指定需要接收信号的进程ID
          - signal 发送的信号，默认为SIGTERM
   1.9 uptime 
     返回当前程序的运行事件
       process.uptime()
   1.10 hrtime
     测试一个代码端的运行事件，返回两个事件，第一个单位是秒，第二个单位是纳秒
   1.11 exit事件
     - 当运行Node.js应用程序进程退出时触发进程对象的exit事件。可以通过指定事件回调函数来指定进程退出时所执行的事件
       process.on('exit',function(){
        console.log('Node.ks进程被推出');
       });
       process.exit();
   1.12 uncaughtException 事件
     - 当应用程序抛出一个未被捕获的异常时触发进程对象的uncaughtException 事件
       process.on('uncaughtException',function(err){
            console.log('捕获到一个未被处理的错误:',err);
       });
       notExist();
   1.13 信号事件
       process.stdin.resume();
       process.on('SIGINT'，function(){
            console.log('接收到SIGINT信号');
       });
 ##2. 子进程
   - 在Node.js中，只有一个线程执行所有操作，如果某个操作需要大量消耗CPU资源的情况下，后续操作都需要等待
   - 在Node.js中，提供了一个child_process模块，通过它可以开启多个子进程，在多个子进程之间可以共享内存，可以通过子进程的互相通信来实现信息的交换
   2.1 spawn 产卵
     2.1.1 语法
       child_process.spawn(command,[args],[options]);
        - command 必须指定的参数，指定需要执行的命令
        - args 数组，存放了所有运行该命令需要的参数
        - options 参数为一个对象， 用于指定开启子进程时使用的选项
          - cwd 子进程的工作目录
          - env 环境变量
          - detached 如果为true，该子进程为一个进程组中的领头进程，当父进程不存在时也可以独立存在
          - stdio 三个元素的数组，设置标准输入/输出
            - pipe 在父进程和子进程之间创建一个管道，父进程可以通过子进程的stdio[0]访问子进程的标准输入，通过stdio[1]访问标准输出，stdio[2]访问错误输出
            - ipc 在父进程和子进程之间创建一个专用与传递消息的IPC通道。可以调用子进程的send 方法向子进程发消息，子进程会触发message事件
            - ignore 指定不为子进程设置文件描述符。这样子进程的标出输入、标准输出和错误输出被忽略
            - stream 子进程和父进程共享一个终端设备、文件、端口或者管道
            - 正整数值 和共享一个stream 是一样的
            - null或undefined 在子进程中创建与父进程相连的管道
        默认情况下，子进程的stdin,stdout,stderr导向了ChildProcess这个对象的child.stdin, child.stdout, child.stderr流
           let spawn = require('child-process').spawn;
           spawn('prg',[],{stdio:['pipe','pipe',process.stderr]});
             - ignore['ignore','ignore','ignore'] 全部忽略
             - pipe['pipe','pipe','pipe'] 通过管道连接
             - inherit[process.stdin, process.stdout, process.stderr] 或[0,1,2]和父进程共享输入输出
            let spawn = require('child_process').spawn;
            spawn('prg',[],{stdio:'inherit'});
             - spawn方法返回一个隐式创建的代表子进程的ChildProcess 对象
             - 子进程对象同样拥有stdin 属性值为一个可用于读入子进程的标准输入流对象
             - 子进程对象同样拥有stdout属性值和stderr属性值可分别用于写入子进程的标准输出流与标准错误输出流
    