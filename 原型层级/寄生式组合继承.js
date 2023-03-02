function inheritPrototype(superType, children) {
  const prototype = new Object(superType.prototype); // 创建对象
  prototype.constructor = children; // 增强对象

  children.prototype = prototype; // 赋值对象
}

function Teacher(nickname, age, height) {
  this.nickname = nickname;
}

function Student(nickname) {
  Teacher.call(this, nickname);
  this.hobby = ["唱", "跳", "rap"];
}

inheritPrototype(Student, Teacher);

Teacher.prototype.running = function () {
  console.log("老师会跑步");
};

Student.prototype.running = function () {
  console.log("学生也会跑步");
};

const student = new Student("moment");

student.running(); // 学生也会跑步
console.log(student.hobby); // ['唱', '跳', 'rap']
console.log(student.nickname); // comment

