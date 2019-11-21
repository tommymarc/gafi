process.stdout.write('stdout');
process.on('message',function(msg){
    console.log('world');
    process.send('子进程：' +msg);
})