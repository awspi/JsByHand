/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  const DFS=(row,col)=>{
    if(grid[row][col]==='0') return
    grid[row][col]='0'
    // 每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成
    row+1<rowLen && DFS(row+1,col)
    row-1>=0 && DFS(row-1,col)
    col+1<colLen && DFS(row,col+1)
    col-1>=0 && DFS(row,col-1)
  }
  let count=0
  const [rowLen,colLen]=[grid.length,grid[0].length]
  for(let row=0;row<rowLen;row++){
    for(let col=0;col<colLen;col++){
      if(grid[row][col]==='1'){
        DFS(row,col)
        count++
      }
    }
  }
return count
};
console.log(numIslands([["1","1","1"],["0","1","0"],["1","1","1"]]));
