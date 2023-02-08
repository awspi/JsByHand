/**
 * 得到一个被拒绝的Promise
 * @param {*} reason
 */
Promise._reject=(reason)=>new Promise((resolve,reject)=>reject(reason))
