/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxValue = function(grid) {
  const dp=new Array(grid.length).fill(0).map(() => new Array(grid[0].length).fill(0));
  dp[0][0]=grid[0][0]
  for(let i=0;i<grid.length;i++){
    for(let j=0;j<grid[0].length;j++){
      if(i===0 && j===0) continue //跳过[0][0]
      if(i == 0) dp[i][j] = dp[i][j-1] + grid[i][j]
      if(j == 0) dp[i][j] = dp[i-1][j] + grid[i][j]
      if(i !== 0 && j !== 0) dp[i,j]=Math.max(grid[i-1][j],grid[i][j-1])+grid[i,j]
    }
  }
  return dp[grid.length-1][grid[0].length-1]
};
console.log(maxValue([[1,3,1],[1,5,1],[4,2,1]]));
