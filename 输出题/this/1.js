var boss = "Bill";
var working = {
  boss: "Bob",
  ask() {
    console.log(this.boss);
  },
  askAgain() {
    setTimeout(function () {
      // setTimeout回调，属于独立函数调用，绑定window
      console.log(this.boss);
    }, 100);
  },
  askKeep() {
    setTimeout(() => {
      // 箭头函数的this绑定到了askKeep
      console.log(this.boss);
    }, 100);
  },
};

working.ask(); //Bob
working.askAgain(); // window
working.askKeep(); // Bob
