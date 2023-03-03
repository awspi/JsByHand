/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = []
  for (let str of s) {
    if (str === '(') {
      stack.push(')')
    } else if (str === '[') {
      stack.push(']')
    } else if (str === '{') {
      stack.push('}')
      //如果字符串还没遍历完 出现右括号 且stack为空 说明右括号落单了 直接false
    } else if (stack.length === 0 || stack.pop() !== str) return false
  }
  //循环完字符串了 但是栈不为空 那应该是遇到左括号 把右括号放在栈中 最后没有右括号消除 剩下来了
  return stack.length === 0
};
