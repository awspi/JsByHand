/**
 * 转驼峰
 * @param {*} str 
 * @returns 
 */
function changeName(str) {
  return str.split('_')
    .map(s => s[0].toUpperCase() + s.slice(1))
    .join('')
}

//! TEST
console.log(changeName('a_test'));//ATest
console.log(changeName('a_te_st'));//ATeSt
console.log(changeName('a_te_s_t'));//ATeS_t

/**
 * 转下划线
 * @param {*} item 
 * @returns 
 */
function transform(item) {
  let res = ''
  let length = item.length
  for (let i = 0; i < length; i++) {
    if (item[i] == item[i].toLowerCase()) {
      //本身就是小写
      res += item[i]
    }
    else {
      //如果是大写 就转为'_'加上小写
      let temp = '_' + item[i].toLowerCase()
      res += temp
    }
  }
  return res
}
console.log(transform('helloWorld'))
