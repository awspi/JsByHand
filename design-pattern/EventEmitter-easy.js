class eventEmitter {
  constructor() {
    this._event = {}
    // {
    //   name: [fn]
    // }
  }
  on(eventName, fn) {
    if (this._event[eventName]) {
      //如果存在key
      this._event[eventName].push(fn)
    } else {
      this._event[eventName] = [fn]
    }
  }
  emit(eventName) {
    this._event[eventName].forEach(fn => void fn())
  }
}

const eventBus = new eventEmitter()

eventBus.on('hello', () => console.log('hello'))
eventBus.on('hello', () => console.log('hello again'))

eventBus.emit('hello')

