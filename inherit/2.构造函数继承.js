function Parent(name, id) {
  this.name = name
  this.id = id
  this.list = []
  this.print = function () {
    console.log(this.name);
  }
}
//* 不可继承父类的原型链方法
Parent.prototype.sayName = function () {
  console.log(this.name);
}
function Child(name, id) {
  //? 相当于Parent构造函数有的都给Child来一套 就算引用类型也会复制一份
  //? 但是Child和Parent没有其他联系
  //? Child的原型链自然也和Parent没关系 所以继承不了父类的原型链方法
  Parent.call(this, name, id)
  //? 构造函数不可复用 指的是每次都要调用父类构造函数
}


const childA = new Child('A', 1)
console.log(childA.name)
// childA.sayName()//不可继承父类的原型链方法
childA.print()
//
const childB = new Child('B', 2)
// childB.sayName()
childB.print()
//
childA.list.push('a')
console.log(childB.list)//
