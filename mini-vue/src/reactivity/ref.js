import { isObject } from "../shared"
import { track, trigger } from "./effect"
import { reactive } from "./reactive"

export function ref(val) {
  if (isRef(val)) {
    return val
  }
  return new RefImpl(val)
}
export function isRef(val) {
  return !!(val && val.__isRef)
}

// ref就是利用面向对象的getter和setters进行track和trigget
class RefImpl {
  constructor(val) {
    this.__isRef = true
    this._val = convert(val)
  }
  get value() {
    track(this, 'value')
    return this._val
  }

  set value(val) {
    if (val !== this._val) {
      this._val = convert(val)
      trigger(this, 'value')
    }
  }
}

// ref也可以支持复杂数据结构
function convert(val) {
  return isObject(val) ? reactive(val) : val
}
