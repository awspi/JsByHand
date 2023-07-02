function run(gen) {
  const g = gen()                     //由于每次gen()获取到的都是最新的迭代器,因此获取迭代器操作要放在_next()之前,否则会进入死循环

  function _next(val) {             //封装一个方法, 递归执行g.next()
    const res = g.next(val)           //获取迭代器对象，并返回resolve的值
    if (res.done) return res.value   //递归终止条件
    res.value.then(val => {         //Promise的then方法是实现自动迭代的前提
      _next(val)                    //等待Promise完成就自动执行下一个next，并传入resolve的值
    })
  }
  _next()  //第一次执行
}


function* myGenerator() {
  console.log(yield Promise.resolve(1))   //1
  console.log(yield Promise.resolve(2))   //2
  console.log(yield Promise.resolve(3))   //3
}

run(myGenerator)

function run2(gen) {
  const g = gen()
  function _next(val) {
    const res = g.next(val)
    if (res.done) return res.value
    res.value.then(val => {
      _next(val)
    })
  }
  _next()
}

function* myGen() {
  console.log(yield Promise.resolve(1))
  console.log(yield Promise.resolve(2))
  console.log(yield Promise.resolve(3))
}
