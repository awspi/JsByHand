// 146. LRU 缓存

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.cache = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    const val = this.cache.get(key)
    // 如果存在，先删除，再重新插入，保证最近使用的在最前面
    this.cache.delete(key)
    this.cache.set(key, val)
    return val
  }
  return -1
}
/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    // 如果已经有了，先删除
    this.cache.delete(key)
  } else if (this.cache.size >= this.capacity) {
    // 如果超过最大值，删除最后一个
    // this.cache.keys().next() 返回第一个key
    this.cache.delete(this.cache.keys().next().value)
  }
  this.cache.set(key, value)
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
