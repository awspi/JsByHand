// 反转链表 II
// https://leetcode.cn/problems/reverse-linked-list-ii/



/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  let dummy = new ListNode()// 哑节点 目的是为了处理left = 1的情况
  dummy.next = head // 哑节点指向头节点
  let prev = dummy // 前驱节点
  // 找到left的前驱节点
  for (let i = 0; i < left - 1; i++) {
    prev = prev.next //prev 最终指向left的前驱节点
  }
  const curr = prev.next // 当前节点 初始化为left节点
  // 从left节点开始反转 right - left 次
  // 例如 left = 2 right = 4
  for (let i = 0; i < right - left; i++) {
    // 保存当前节点的下一个节点
    const next = curr.next
    // 反转指针
    curr.next = next.next
    // next节点指向前驱节点
    next.next = prev.next
    // 前驱节点指向next节点
    prev.next = next
  }
  // 返回头节点
  return dummy.next
};
