function Parent() {
  this.name = 'parent'
  this.list = []
  this.print = function () {
    console.log(this.name);
  }
}
Parent.prototype.hi = function () {
  console.log('hi');
}
//
function Child() {
}
//? 把子类的原型链指向父类的对象实例
Child.prototype = new Parent()

const childA = new Child()
console.log(childA.name)
childA.print()
//
const childB = new Child()
childA.list.push('a')
//! 共享引用类型
console.log(childB.list)// [ 'a' ]
//
childA.name = 'childA'
console.log(childA.name)
