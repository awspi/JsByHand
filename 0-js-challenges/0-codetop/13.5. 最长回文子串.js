// 5. 最长回文子串


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  if (s.length < 2) return s
  let start = 0 // 记录最长回文子串的起点
  let maxLen = 0 // 记录最长回文子串的长度
  const expand = (left, right) => {
    // left >= 0 && right < s.length 保证不越界
    while (left >= 0
      && right < s.length
      && s[left] === s[right] // 判断是否回文
    ) {
      // 如果是回文 更新 maxLen 和 start
      if (right - left + 1 > maxLen) {
        maxLen = right - left + 1 // 更新最长回文子串的长度
        start = left // 更新最长回文子串的起点
      }
      // 向两边展开
      left-- // 向左扩展
      right++ // 向右扩展
    }
  }
  for (let i = 0; i < s.length; i++) {
    expand(i - 1, i + 1)
    expand(i, i + 1)
  }
  // 有个测试用例 ‘ac’ a  说明回文子集可以是第一个 单独字母 maxLen || 1
  return s.substring(start, start + maxLen || 1)
};
