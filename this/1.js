var name = "window";
var person = {
  name: "person",
  sayName: function () {
    console.log(this.name);
  }
};
function sayName() {
  var sss = person.sayName;
  //* 独立函数调用，没有和任何对象关联
  sss(); // window
  //* 关联
  person.sayName(); // person
  (person.sayName)(); // person (这种其实跟上面这行没有区别）
  (b = person.sayName)(); // window
}
sayName();


