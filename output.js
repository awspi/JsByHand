class Student {
  constructor() {
    this.name = "Jerry"
  }
  getInfo() {
    return {
      name: "Tom",
      getName() {
        return this.name
      }
    }
  }
}

const stu = new Student()

console.log(stu.getInfo().getName.call(stu))//Tom
