var num = 222
var a = {
  num: 111,
  say: function () {
    console.log(this.num)
  }
}

var fn = a.say
fn()
a.say()

var b = {
  num: 333,
  say: function (fn) {
    fn()
  }
}
b.say(a.say)
b.say = a.say
b.say()

//222
//111
//222
//333
// 对象中需要使用this来指定
