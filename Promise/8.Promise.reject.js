/**
 * 得到一个被拒绝的Promise
 * @param {*} reason
 */
Promise._reject = (reason) => new Promise((_, reject) => reject(reason))

//!——————————————————————TEST

const pRejected = Promise._reject('errrrror')
pRejected.catch(console.log)


