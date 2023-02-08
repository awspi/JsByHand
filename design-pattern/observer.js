class Observerd {
  constructor() {
    this._observerList = []
  }
  addObserver(observer) {
    this._observerList.push(observer)
  }
  notify() {
    this._observerList.forEach(ob => ob.update())
  }
}

class Observer {
  constructor(cb) {
    this._cb = cb
  }
  update() {
    this._cb()
  }
}
//TEST
const ob1 = new Observer(() => console.log('我是ob1，我观察到小白鼠有反应了，太饿了，我得去吃个饭了'))
const ob2 = new Observer(() => console.log('我是ob2，我观察到小白鼠有反应了，我要继续工作！'))
const xiaoBaiShu = new Observerd()
xiaoBaiShu.addObserver(ob1)
xiaoBaiShu.addObserver(ob2)
xiaoBaiShu.notify() // .... .... 
