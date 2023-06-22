// 发布订阅者模式

// 发布订阅者模式

class EventEmitter {
  constructor() {

    /**
     *  {
     *  eventName: [{ fn,isOnce },{ fn,isOnce }]
     * }
     */
    this.events = {}
  }
  on(eventName, fn, isOnce = false) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push({ fn, isOnce })
  }
  emit(eventName, ...args) {
    if (!this.events[eventName]) return
    this.events[eventName].forEach((event, index) => {
      event.fn(...args)
      if (event.isOnce) {
        this.events[eventName].splice(index, 1)
      }
    })
  }
  off(eventName, fn) {
    if (!this.events[eventName]) return
    this.events[eventName] = this.events[eventName].filter(event => event.fn !== fn)
  }
  once(eventName, fn) {
    this.on(eventName, fn, true)
  }
}

//test
const event = new EventEmitter()
const fn = (...args) => {
  console.log('args:', args)
}
event.on('click', fn)
event.emit('click', 'should log')
event.emit('click', 'should log too')
event.off('click', fn)
event.emit('click', 'should not log')
event.once('click', fn)
event.emit('click', 'should log once')
event.emit('click', 'should not log')

