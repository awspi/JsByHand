// 102. 二叉树的层序遍历

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const res = []
  if (!root) return res
  const queue = []
  // 如果root不为null，往队列添加root
  queue.push(root)

  while (queue.length) {
    let currentSize = queue.length // 记录 当前层 中节点的个数
    let currentRes = [] //定义数组存放当前层的节点值
    while (currentSize) {
      const node = queue.shift()
      currentRes.push(node.val) //把 当前层的节点加到一个数组

      // 将弹出节点的左右孩子添加到队列中
      // 等着外层遍历queue 再把子节点的值加到对应层的数组
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
      //每弹出该层一个元素，size需要更新
      currentSize--
    }
    //将每层元素的结果放入results数组
    res.push(currentRes)
  }
  return res
};
