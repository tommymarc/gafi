let i = 0 ;
let timer = setInterval(function(){
    process.stdout.write(new Date().toUTCString());
    if(i>=10){
        clearInterval(timer);
    }
},1000);
