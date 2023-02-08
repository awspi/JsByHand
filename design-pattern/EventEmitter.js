
class EventEmitter {
  // 补全代码
  constructor() {
    this.event = {}
  }
  on(e, fn) {
    this.event[e] ? this.event[e].push(fn) : this.event[e] = [fn]
  }
  emit(e) {
    if (this.event[e]) this.event[e].forEach(fn => fn())
  }
}
