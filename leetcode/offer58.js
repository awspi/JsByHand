/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  const reverse=(arr)=>{
    let left=0,right=arr.length-1
    const swap=(s,l,r)=>[s[l],s[r]]=[s[r],s[l]]
    while(left<right){
      swap(arr,left++,right--)
    }
    return arr
  }
  return reverse(s.trim().split(' ').filter(s=>s!=='')).join(' ')
};
console.log(reverseWords("the sky is blue"));
