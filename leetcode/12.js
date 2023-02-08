/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
  const rowLen=board.length
  const colLen=board[0].length
  // 这类题目的通解。通过修改原矩阵上面遍历过的值来替代used数组这种回溯思想，非常节省时间和空间。
  const DFS=(word,row,col)=>{
    if(word.length===0) return true
    if(row<0||row>=rowLen||col<0||col>=colLen) return false
    if(board[row][col]!==word[0]) return false
    //
    const temp=board[row][col]
    board[row][col]='@'//修改原矩阵上面遍历过的值
    const nextWord=word.slice(1)
    res=DFS(nextWord,row-1,col)||DFS(nextWord,row+1,col)||DFS(nextWord,row,col-1)||DFS(nextWord,row,col+1)
    //回溯
    board[row][col]=temp
    return res
  }
  for(let row=0;row<board.length;row++){
    for(let col=0;col<word[0].length;col++){
      if(board[row][col]===word[0]){
        //找到第一个相等的开始
        if(DFS(word,row,col)) return true
      }
    }
  }
  return false
};

console.log(exist([["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]],"SEE"));
