function Parent(name, id) {
  this.name = name
  this.id = id
  this.list = []
  this.print = function () {
    console.log(this.name);
  }
}
Parent.prototype.sayName = function () {
  console.log(this.name);
}
//* 构造函数继承
function Child(name, id) {
  //? 相当于Parent构造函数有的都给Child来一套 就算引用类型也会复制一份
  //! 执行一次Parent构造函数
  Parent.call(this, name, id)
  //? 构造函数不可复用 指的是每次都要调用父类构造函数
}
//* 原型链继承
//? Child的原型链指向Parent实例 可以继承父类的原型链方法
//! 执行第二次Parent构造函数
Child.prototype = new Parent()


const childA = new Child('A', 1)
console.log(childA.name)
childA.sayName()
childA.print()
//
const childB = new Child('B', 2)
childB.sayName()
childB.print()
//
childA.list.push('a')
console.log(childB.list)//
