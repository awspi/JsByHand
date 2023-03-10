function A(x) {
  this.x = x
}
A.prototype.x = 1
function B(x) {
  this.x = x
}
B.prototype = new A()//!此时A的x===undefined
const b = new B(3)


// b.__proto__ = B.prototype===a.__proto__===A.prototype
console.log(b.__proto__ === A.prototype);
delete b.x
console.log(b.x) //undefined
