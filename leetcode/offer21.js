/**
 * @param {number[]} nums
 * @return {number[]}
 */
var exchange = function(nums) {
  if(nums.length=1) return nums
  for(let left=0,right=1;right<nums.length;right++){
    if(nums[right]%2!==0){
      const temp=nums[left]
      nums[left]=nums[right]
      nums[right]=temp
      left++
    }
  }
  return nums
};
console.log(exchange([1,2,3,4]));
