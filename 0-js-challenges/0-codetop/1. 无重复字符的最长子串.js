// 3. 无重复字符的最长子串

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set() // 用来存储字符
  let left = 0
  let right = 0
  let max = 0
  // 用滑动窗口来解决
  while (right < s.length) {
    // 如果不包含当前字符，就加入set，right++
    if (!set.has(s[right])) {
      set.add(s[right])
      right++
    } else {
      // 如果包含当前字符，就删除set中的第一个字符，left++
      // 直到不包含当前字符
      set.delete(s[left])
      left++
    }
    // 每次循环都更新max
    max = Math.max(max, set.size)
  }
  return max
};
