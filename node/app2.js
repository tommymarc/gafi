// 数据和对象的原生方法
Array.concat()            //连接数组
Array.length()            //数组的大小
Array.pop()               //删除数组中最后一个元素
Array.push()              //给数组添加一个元素
Array.reverse()           //颠到数组中元素
Array.shift()             //删除数组中的第一个元素
Array.unshift()           //在数组的头部插入一个元素
Array.splice()            //插入、删除、替换元素
Array.slice()             //寻找数组下标，取数组中的元素（可为负值，逆向取值）
Array.toLocaleString()    //把数组转换成局部字符串
Array.toString()          //把数组转换成一个字符串
  .hasOwnProperty()       //检查属性是否被继承
  .isPrototypeOf()        //一个对象是另一个的圆形
  .propertyIsEnumerable() //是否可以用for/in循环看到属性
  .toLocaleString()       //返回对象的本地字符串表示
  .toString()             //定义一个对象的字符串表示
  .valueOf()              //指定对象的原始值

// 如何消除数组里的重复元素
var data = [1,2,3,4,4,5,5,6,6];
function newData(data){
  var nData = new Array();
  for(var i = 0;i<data.length;i++){
    if(nData.indexOf(data[i]) == -1){
      nData.push(data[i]);
    }
  }
}
// 穿件一个新数组，把原来的数组从新添加进去。判断新数组是否存在原数组元素，没有则添加；有则不添加



