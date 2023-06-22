// 岛屿数量
const island = [
  [1, 1, 0, 0, 0],
  [1, 1, 0, 0, 0],
  [0, 0, 1, 1, 1],
  [0, 0, 0, 1, 1]
]

const maxAreaOfIsland = (grid) => {
  let max = 0
  const row = grid.length // 行
  const col = grid[0].length // 列

  /**
   *  深度优先遍历
   * @description 递归遍历上下左右
   * @param {*} grid 
   * @param {*} r 
   * @param {*} c 
   * @returns 
   */
  const dfs = (grid, r, c) => {
    // 递归终止条件
    if (
      r < 0 || c < 0
      || r >= row || c >= col
      || grid[r][c] === 0
    ) {
      return 0
    }
    grid[r][c] = 0 // 为了防止重复计算，将遍历过的岛屿置为0
    let num = 1
    // 递归遍历上下左右
    num += dfs(grid, r + 1, c)
    num += dfs(grid, r - 1, c)
    num += dfs(grid, r, c + 1)
    num += dfs(grid, r, c - 1)

    return num // 返回岛屿面积
  }

  // 遍历每一个点
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 1) {
        // 如果是岛屿，就计算岛屿面积
        max = Math.max(max, dfs(grid, i, j))
      }
    }
  }
  return max

}

console.log(maxAreaOfIsland(island));
