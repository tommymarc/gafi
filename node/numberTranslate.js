function inNum(){
    var num = "54";
    var a = parseInt(num %10);//个
    var b = parseInt((num %100)/10);//十
    var c = parseInt((num %1000)/100);//百
    var d = parseInt((num %10000)/1000);//千
    var e = parseInt((num %100000)/10000);//万
    if( num <= 10){
        console.log(a)
        console.log(outNum(a));
    }
    if(num < 100 && num > 10){
        //num % 10 表示个位
        //num / 10 表示十位
        console.log(b)
        console.log(outNum(b) + "拾" + outNum(a));
    }
    if(num < 1000 && num > 100){
        //num % 10 表示个位
        //num / 10 表示十位
        console.log(c)
        console.log(outNum(c)+"百"+outNum(b) + "拾" + outNum(a));
    }
    if(num < 10000 && num > 1000){
        //num % 10 表示个位
        //num / 10 表示十位
        console.log(c)
        console.log(outNum(d)+"千"+outNum(c)+"百"+outNum(b) + "拾" + outNum(a));
    }
    if(num < 100000 && num > 10000){
        //num % 10 表示个位
        //num / 10 表示十位
        console.log(c)
        console.log(outNum(e)+"万"+outNum(e)+"千"+outNum(c)+"百"+outNum(b) + "拾" + outNum(a));
    }
    if(num < 1000000 && num > 100000){
        //num % 10 表示个位
        //num / 10 表示十位
        console.log(c)
        console.log(outNum(e)+"万"+outNum(e)+"千"+outNum(c)+"百"+outNum(b) + "拾" + outNum(a));
    }
}
inNum();
function outNum(target){

    switch(target){
        case 0:
            target =  "零";
            break;
        case 1:
            target = "壹";
            break;
        case 2:
            target =  "贰";
            break;
        case 3:
            target = "叁";
            break;
        case 4:
            target= "肆";
            break;
        case 5:
            target = "伍";
            break;
        case 6:
            target = "陆";
            break;
        case 7:
            target = "柒";
            break;
        case 8:
            target = "捌";
            break;
        case 9:
            target = "玖";
            break;
        case 10:
            target = "拾";
            break;
    }
    return target;
}

