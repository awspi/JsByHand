var Foo = function () {
  getName = function () {
    console.log(1)
  }
  return this
}
Foo.getName = function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4)
}
function getName() {
  console.log(5)
}

// 2 4 2 3 3
Foo.getName()
getName()//4
// 相当于 getName=undefined; getName(){5};getName={2}
//
new Foo.getName()//2
new Foo().getName()//3
new new Foo().getName()//3
