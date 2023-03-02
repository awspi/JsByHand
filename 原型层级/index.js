function Person(name, age) {
  this.name = name;
  this.age = age;
}
// 在这里,把方法running定义在了Person的prototype属性上了
Person.prototype.running = function (info) {
  console.log(info);
};

const obj = {};

const person = new Person("moment", 18);
const student = new Person("supper", 16);

console.log(obj.__proto__ === Object.prototype); // true
console.log(Object.constructor === Function); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true
console.log(Function.constructor === Function); // true
console.log(Person.__proto__.constructor.__proto__ === Function.prototype); // true
console.log(student.__proto__.__proto__.constructor.__proto__ === Function.prototype); // true
console.log(Function.constructor.__proto__ === Function.prototype); // true
console.log(Object.constructor === Function.constructor); // true
console.log(Object instanceof Function); // true
console.log(Function instanceof Object); // true
console.log(Function.prototype.__proto__ === Object.prototype); // true

