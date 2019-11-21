function person(name,age,hobby,cont){
    this.name = name;
    this.age = age;
    this.hobby = hobby;
    this.cont = cont;
};
function student(name,age,hobby,cont,num,grade){
    person.apply(this,arguments); //请求数组arguments
    this.num = num;
    this.grade = grade;
};
let student1 = new student('小明',8,'打篮球',120,180,110);
console.log("name:" + student1.name + "\n" + "age:" + student1.age + "\n" + "grade:" + student1.grade + "\n" +  "cont:" + student1.cont + "\n" +  "num:" +   student1.num + "\n" +  "hobby:" +  student1.hobby);

let l1 = [1,2,3];
let l2 = [5,6,7];
let l3 = l1.concat(l2);
Array.prototype.push.apply(l2,l1);
// console.log(l3);
console.log(l2);

/**
 * l1.concat(l2)  合并l1 跟 l2 不改变原数组，形成了新的数组 l3
 * Array.prototype.push.apply(l2,l1); 合并l2,l1 将新数组赋值到了l2 中
 *
 **/