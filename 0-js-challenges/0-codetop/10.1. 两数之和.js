// 1. 两数之和
// https://leetcode.cn/problems/two-sum/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */


// 返回两个下标
var twoSum = function (nums, target) {
  const map = new Map() // key: num, value: index
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    const x = target - num // 差值
    if (map.has(x)) {
      // 如果map的key中存在差值，则返回对应的下标
      return [map.get(x), i]
    } else {
      // 如果不存在，则将当前值作为key，下标作为value存入map
      map.set(num, i)
    }
  }
};
