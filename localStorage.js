// 会过期的localStorage
// 某个键值过期后，该键值不会被马上删除，而是等到下次被使用的时候，才会被检查到过期，此时才能得到删
class MyStorage {
  constructor() {
    this._prefix = 'pithy_'
  }
  get(key) {
    let val = localStorage.getItem(this._prefix + key)
    if (!val) return null
    val = JSON.parse(val)
    //? 检查是否到期 到期就删除
    if (val.expires < Date.now()) {
      localStorage.removeItem(this._prefix + key)
      return null
    }
    return val.val
  }
  /**
   * 
   * @param {*} key 
   * @param {*} val 
   * @param {*} expires 过期时间，单位为秒
   */
  set(key, val, expires) {
    const obj = {
      key,
      val,
      'expires': Date.now() + expires * 1000
    }
    localStorage.setItem(this._prefix + key, JSON.stringify(obj))
  }
}

const storage = new MyStorage()
storage.set('key1', 123, 10)

console.log(storage.get('key1'))
setTimeout(() => {
  console.log(storage.get('key1'));
}, 11000);


