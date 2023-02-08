function inherit(subClass, superClass) {
  //* 复制父类 以他的构造函数
  const p = Object.create(superClass.prototype)
  //* 构造函数指向subClass
  p.constructor = subClass
  //* 子类的原型设置为复制的父类
  subClass.prototype = p
}

function Parent(name, id) {
  this.id = id
  this.name = name
  this.list = []
  this.printName = function () {
    console.log(this.name);
  }
}
Parent.prototype.sayName = function () {
  console.log(this.name);
}

function Child(name, id) {
  // 子类使用call执行构造函数
  Parent.call(this, name, id)
}

inherit(Child, Parent)
const childA = new Child('asd', 123)
childA.sayName()
