//! SWR HTTP 缓存失效策略 stale-while-revalidate
//? 后台缓存刷新 | 异步缓存更新
// stale 用来形容一个缓存过期
// 当 revalidate 请求进行时，客户端可以不等待，直接使用过期的缓存
// revalidate 完了缓存就更新了，下次用的就是新的

//? 1. 当请求数据时，首先从缓存中读取，并立即返回给调用者
//? 2. 如果数据已经过期，则发起 fetch 请求，获取最新数据

// 使用map而不是对象，是因为对象的key只能是字符串或者Symbol，而Map可以是任意类型
/**
 * @example
 * {
 *    cacheKey: { value: null, promise: null }
 * }
 */
const cache = new LRUCache(20) // 最大缓存20条数据

/**
 * @description swr
 * @param {*} cacheKey 缓存的key
 * @param {*} fetcher 发起的请求
 * @param {*} cacheTime 缓存时间
 * @returns 
 */
const swr = async (stringOrFunc, fetcher, cacheTime) => {
  // 条件缓存
  // 如果是函数，则调用函数将返回值作为 cacheKey
  const cacheKey = typeof stringOrFunc === 'function'
    ? stringOrFunc()  // 如果是函数，则调用函数将返回值作为 cacheKey
    : stringOrFunc;

  // 如果条件不满足(cacheKey不存在)，则直接发起请求
  if (!cacheKey) return await fetcher()

  // 取出数据
  const data = cache.get(cacheKey)
    || {
    value: null,
    promise: null,
    time: 0 //如果数据不存在 time 为0 肯定会过期 
  }
  // 如果数据不存在，需要初始化
  cache.set(cacheKey, data)

  // 如果数据过期了，需要重新请求
  const isExpired = Date.now() - data.time > cacheTime



  // 已经过期了(包含了没有数据的情况)，需要发送请求
  if (isExpired && !data.promise) {
    data.promise = fetcher()
      .then(val => data.value = val)
      .finally(() => data.promise = null)// ? 请求结束 promise 置空
  }

  // 没有数据 但是请求中ing，等待请求结束 保证一定有数据返回
  if (!data.value && data.promise) await data.promise

  // 返回数据
  return data.value
}


// 新加入的数据插入到第一项
// 每当缓存命中（即缓存数据被访问），则将数据提升到第一项
// 当缓存数量满的时候，将最后一项的数据丢弃

//? Map 的遍历顺序就是插入顺序
// const map = new Map()
// map.keys().next().value // 获取第一个key 也就是最早的那个key

class LRUCache {
  constructor(max) {
    this.max = max
    this.cache = new Map()
  }
  get(key) {
    //! 应该用has而不是get，因为get会返回null，而has只返回true或false
    //? 如果用get 在if判断时，如果值为null，会被当做false
    if (!this.cache.has(key)) return
    const val = this.cache.get(key)
    // 如果存在，先删除，再重新插入，保证最近使用的在最前面
    this.cache.delete(key)
    this.cache.set(key, val)
    return val

  }
  set(key, val) {
    if (this.cache.has(key)) {
      // 如果已经有了，先删除
      this.cache.delete(key)
    } else if (this.cache.size >= this.max) {
      // 如果超过最大值，删除最后一个
      // this.cache.keys().next() 返回第一个key
      this.cache.delete(this.cache.keys().next().value)
    }
    // 重新插入
    this.cache.set(key, val)
  }
}
