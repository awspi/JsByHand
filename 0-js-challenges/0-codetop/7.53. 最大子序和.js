// 53. 最大子数组和
// https://leetcode.cn/problems/maximum-subarray/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let max = nums[0] //保存最大值
  let currentMax = nums[0] // 保存当前最大值
  for (let i = 1; i < nums.length; i++) {
    //! 如果当前最大值加上当前元素比当前元素小，那么就抛弃当前最大值
    //! 从当前元素开始重新计算
    currentMax = Math.max(nums[i], currentMax + nums[i])
    // 更新最大值
    max = Math.max(currentMax, max)
  }
  return max
};
