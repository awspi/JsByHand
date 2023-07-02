// 剑指 Offer 48. 最长不含重复字符的子字符串

var lengthOfLongestSubstring = function (s) {
  //滑动窗口
  //map存储字符和下标
  // key:字符 value:不重复子串的下一个位置
  const map = new Map()
  let maxLen = 0
  //start:不重复子串的起始位置 end:不重复子串的结束位置
  for (let start = 0, end = 0; end < s.length; end++) {
    //如果map中存在当前字符，更新start
    if (map.has(s[end])) {
      //start取当前字符上一次出现的位置和当前start中的最大值
      // 取最大值是为了防止start向左移动
      start = Math.max(start, map.get(s[end]))
    }
    // 更新map中的字符和下标 保存的下标是当前字符的下一个位置
    // 为什么是下一个位置？因为start是不重复子串的起始位置
    map.set(s[end], end + 1)
    maxLen = Math.max(maxLen, end - start + 1)
  }
  return maxLen
};
