// 寄⽣组合继承
//? 优点：保持了原型链的完整，子类可以向父类传参，效率高（不需要执行父类构造函数）
function Parent(name) {
  this.name = name; //! 实例基本属性 私有不共享
  this.colors = ['red', 'blue', 'green']; //! 实例引用属性 强调私有
}

//! 将需要复⽤、共享的⽅法定义在⽗类原型上
Parent.prototype.say = function () {
  console.log('hello')
}

function Child(name, age) {
  Parent.call(this, name); //! 核⼼ 继承实例属性
  this.age = age;
}
//! 核⼼ 通过创建中间对象，⼦类原型和⽗类原型，就会隔离开。
// ? 因为方法在父类的原型上，所以这里要将父类的原型赋值给 ‘中间对象’
// 为什么不直接将父类的原型赋值给子类的原型？
// 因为接下来还要修正子类prototype.constructor的指向 
// 修改的时候会把父类的propertype.constructor也修改为子类
Child.prototype = Object.create(Parent.prototype);

//! 核⼼ 修复构造函数指向
Child.prototype.constructor = Child;

const child1 = new Child('kevin', '18');
child1.colors.push('black');
console.log(child1.name); // kevin
console.log(child1.age); // 18
console.log(child1.colors); // ["red", "blue", "green", "black"]
child1.say(); // hello

const child2 = new Child('daisy', '20');
console.log(child2.name); // daisy
console.log(child2.age); // 20
console.log(child2.colors); // ["red", "blue", "green"]
child2.say(); // hello


// 封装成一个函数 
/**
 * 
 * @param {*} subType 子类
 * @param {*} superType 父类
 */
function inheritPrototype(subType, superType) {
  // 创建父类原型的副本 获取父类原型的方法
  const prototype = Object.create(superType.prototype);
  // 修正子类原型的构造函数指向
  prototype.constructor = subType;
  // 将父类原型的副本赋值给子类原型
  subType.prototype = prototype;
}

