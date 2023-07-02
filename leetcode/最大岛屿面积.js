// 最大岛屿面积
const maxAreaOfIsland = function (grid) {
  let max = 0;
  let row = grid.length;
  let col = grid[0].length;
  const dfs = function (grid, r, c) {
    if (r < 0 || c < 0
      || r >= row
      || c >= col
      || grid[r][c] === 0) {
      return 0;
    }
    // 为了防止重复计算，将遍历过的岛屿置为0
    grid[r][c] = 0;
    // 递归遍历上下左右
    let num = 1;
    num += dfs(grid, r + 1, c);
    num += dfs(grid, r - 1, c);
    num += dfs(grid, r, c + 1);
    num += dfs(grid, r, c - 1);
    return num;
  };
  // 遍历每一个点
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++)
      if (grid[i][j] === 1) {
        max = Math.max(max, dfs(grid, i, j));
      }
  }
  return max;
}
console.log(maxAreaOfIsland([
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1]
]));
