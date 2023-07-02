// 最长不含重复字符的子字符串
const lengthOfLongestSubstring = function (s) {
  const map = new Map()
  let maxLen = 0
  for (let start = 0, end = 0; end < s.length; end++) {
    if (map.has(s[end])) {
      start = Math.max(start, map.get(s[end]))
    }
    map.set(s[end], end - start + 1)
    maxLen = Math.max(maxLen, end - start + 1)
  }
}
