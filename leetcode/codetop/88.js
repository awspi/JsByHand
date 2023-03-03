/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
function merge(nums1, m, nums2, n) {
  let count = m + n
  while (m > 0 && n > 0) {
    nums1[--count] = nums1[m - 1] > nums2[n - 1] ? nums1[--m] : nums2[--n]
  }
  if (n > 0) {
    // 说明 nums2 中还有剩余没有比较的数字
    // 将其插入替换 nums1 数组前面n个数字即可
    nums1.splice(0, n, ...nums2.slice(0, n))
  }
};


let nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3
merge(nums1, m, nums2, n)
console.log(nums1);

