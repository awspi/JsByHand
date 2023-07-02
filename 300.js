// 300. 最长递增子序列
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  // dp[i] 表示以 nums[i] 结尾的最长上升子序列的长度
  let dp = new Array(nums.length).fill(1);
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      // 如果 nums[i] > nums[j]
      // 则 nums[i] 可以接在 nums[j] 后面，形成一个比 dp[j] 更长的上升子序列，长度为 dp[j] + 1
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    max = Math.max(max, dp[i]);
  }
  return max;
};
