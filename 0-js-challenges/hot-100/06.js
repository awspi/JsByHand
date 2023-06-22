// instanceof

const myInstanceOf = (left, right) => {
  const proto = left.__proto__
  const prototype = right.prototype
  while (proto) {
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)// 等价于 proto.__proto__
  }
  return false
}

//test
console.log(myInstanceOf([], Array))

function Animal() { }
function Cat() { }
Cat.prototype = Object.create(Animal.prototype)
const cat = new Cat()
console.log(myInstanceOf(cat, Cat))
