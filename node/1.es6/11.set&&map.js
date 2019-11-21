/**
 * Set是一堆东西的集合，Set有点像数组
 * 不过跟数组不一样的是，Set里面不能有重复的内容
 **/
let books = new Set();
books.add('js');
books.add('js');//添加重复元素集合的元素个数不会改变
books.add('node');
books.forEach(function(book){//循环集合
    console.log(book);
})
console.log(books.size); //集合中元素的个数
console.log(books.has('js'));//判断集合中是否有此元素
books.delete('js'); //从集合中删除此元素
console.log(books.size); // 1
console.log(books.has('js')); // false
books.clear(); //清空 Set
console.log(books.size); // 0
console.log(books); //Set {}


console.log('——————————————')
/**
 * Map
 * 可以使用Map来组织这种 名值对 的数据
 */


let books2 = new Map();
books2.set('js',{name:'js'}); //向map中添加元素
books2.set('html',{name:'html'});
console.log(books2.size);//查看集合中的元素
console.log(books2.get('js'));//通过key获取值
books2.delete('js');//执照key删除元素
console.log(books2.has('js'));//判断map中有没有key
books2.forEach((value,key)=>{//forEach可以迭代map
    console.log(key + ' = ' +value);
});
books2.clear();
console.log(books2); //Map {}


