process.on('message',fuction(msg){
    process.send('test3:' +msg)
})