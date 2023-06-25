// 20. 有效的括号


/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  const stack = [] // 用数组模拟栈
  const map = new Map() // key: 左括号, value: 右括号
  map.set('(', ')')
  map.set('{', '}')
  map.set('[', ']')

  for (let i = 0; i < s.length; i++) {
    // 如果是左括号，则将对应的右括号入栈
    if (map.has(s[i])) {
      stack.push(map.get(s[i]))
    } else {
      // 如果map的key中不存在，则说明是右括号
      // 如果栈为空或者栈顶元素不等于当前元素，则返回false
      if (s[i] !== stack.pop()) return false
    }
  }
  // 如果栈为空，则说明括号全部匹配
  // 否则 说明有左括号没有匹配到右括号 栈中剩下了未匹配的右括号
  return !stack.length
};
