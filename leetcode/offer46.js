/**
 * @param {number} num
 * @return {number}
 */
var translateNum = function(num) {
  const dp=[1] // dp[i] 表示 前 i 位 可以解码的总数
  for(let i=1;num>0;num=Math.floor(num/10),i++){
    const n=num%100
    if(n>9 && n<26){//2位数
      if(i===1){
        dp[i]=2
      }else{
        dp[i]=dp[i-1]+dp[i-2]
      }
    }else{
      dp[i]=dp[i-1]
    }
  }
  return dp[dp.length-1]
};
console.log(translateNum(25));
