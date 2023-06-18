function Person(age) {
  this.age = age;
}
Person.prototype.name = "name1";

let person = new Person();
console.log(person.name); // name1

Person.prototype = { name: "name2" };
console.log(person.name); // name1

person.name = "name3";
console.log(person.name); // name3

// 第二个还是输出1是因为，他指向的prototype没变
//! 在内存中由这个对象保存了引用，所以原来的prototype不会被销毁
// 如果要让他输出name2，可以直接设置prototype.name = 'name2'

