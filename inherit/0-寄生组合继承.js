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


