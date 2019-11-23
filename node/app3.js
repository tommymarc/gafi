var args = [ 1, 2, 3, 4, 5, 6];
var arg2 = [1, 2, 3, 4 ]
// arg1 = Array.from(args);
// arg1=[...args];
// arg1= Array.prototype.slice.call(arg2);
arg1 = [...args]
arg1.push(77);
console.log(arg1)
console.log(args)
arg3 = arg2.reverse();//翻转数组
console.log(arg3)
console.log(arg3.slice(1,3))

const list = [
    {name:"s1", age:18, point:110},
    {name:"s2", age:19, point:120},
    {name:"s3", age:20, point:115}
];
const ageOlder = list.find(stu => stu.age === 20);
const pointHighest = list.find(stu =>stu.point ===120);
console.log(pointHighest)
console.log(ageOlder)

arg4= arg3.join('wo')
console.log(arg4)