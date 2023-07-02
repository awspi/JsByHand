const _new = (constructFn, ...args) => {
  // 1. 创建一个新对象
  const obj = new Object()
  // 2. 将新对象的__proto__指向构造函数的prototype
  obj.__proto__ = constructFn.prototype
  // 3. 将构造函数的this指向新对象 并执行构造函数 为这个新对象添加属性
  const res = constructFn.apply(obj, args)
  // 4. 如果构造函数返回的是一个对象 则返回这个对象 否则返回新对象
  return typeof res === 'object' ? res : obj
}

function myNew(constructor, ...args) {
  // 创建一个新的对象，该对象的原型指向构造函数的原型
  const obj = Object.create(constructor.prototype);
  // 将构造函数的this指向新创建的对象，并执行构造函数
  const result = constructor.apply(obj, args);
  // 如果构造函数返回的是一个对象，则返回该对象，否则返回新创建的对象
  return typeof result === 'object' ? result : obj;
}


function Animal(name) {
  this.name = name;
}
let animal = _new(Animal, 'dog')
console.log(animal);
