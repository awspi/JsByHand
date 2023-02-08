const Parent = {
  name: 'parent',
  list: [],
  print: function () {
    console.log(this.name);
  }
}

function copy(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}

const childA = copy(Parent)

childA.print()
childA.name = 'childA'
console.log(childA.name)

const childB = copy(Parent)
// childA.list.push('a')
//! 共享引用类型
console.log(childB.list)// [ 'a' ]
