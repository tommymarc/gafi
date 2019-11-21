let arr1 = [24,56,88,90,5];
//filter  过滤器
//返回true 此元素保留在新数组，返回false则删除
/*
Array.prototype.filter = function(fn){
    let newArr = [];
    for(let i=0;i<thislength;i++){
        let flag = fn(this[i]);
        flag&&newArr.push(this[i])
    }
    return newArr
}
Array.filter(function(item){
    return item != listener
})
 */
let arr2 = arr1 .filter(function(item){//过滤器
    return item>=60; //数字大于60留下
});
console.log(arr2);//[88,90]

let arr3 = Array(3);//创建长度为3 的数组
console.log(arr3);// [ , , ]
arr3.fill(1);//向数组中填值
console.log(arr3);//[1，1，1]


//  map() reduce() reduceRight() forEach()
//  find() findIndex()  some() every()

let arr4 = [1,2,3];
/*
Array.prototype.find = function(fn){
    for(let i=0; i<this.length; i++){
        if(flag){
            return this[i];
        }
    }
}
 */
/*
Array.prototype.findIndex = function(fn){
    for(let i=0; i<this.length; i++){
        if(flag){
            return i;
        }
    }
}
 */
let result = arr4.find(function(item){
    return item == 2;
});// 找到数组中的元素
console.log(result);// 2

let result1 = arr4.findIndex(function(item){
    return item == 2
});// 找到数组中元素的下标
console.log(result1);// 1

// every 要求每一个元素都要符合条件
Array.prototype.every = function(fn){
    let flag = true ;
    for(let i=0; i<this.length; i++){
        let flag = fn(this[i]);
        if(!flag){// 只要有一个元素不符合要求，则false
            return false;
        }
    }
    return flag;
};
// some 只要有一个元素符合条件即可
Array.prototype.some = function(fn){
    let flag = true;
    for(let i=0; i<this.length; i++){
        let flag = fn(this[i]);
        if(flag){
            return flag;
        }
    }
    return flase;//一个都没有则false
};


//from()
function print(){
    /**  1
    let arr = Array.prototype.slice().call(arguments);//把arguments转换成数组arr
    arguments.forEach(function(item){
        console.log(item)//此处非数组，所以不可以用forEach
    })
    **/
    /**  2
     Array.prototype.forEach.call(arguments,function(item){
        console.log(item)  //a b c
     })
     */
    //把一个类数组专程数组
    Array.from(arguments).forEach(function(item){
        console.log(item);
    });
}
print('a', 'b', 'c');
//希望把一个类数组变成一个数组

let arr6 = Array(3);
console.log(arr6);//  3个空数值的数组
let arr7 = Array.of(3);
console.log(arr7);//  [ 3 ]

