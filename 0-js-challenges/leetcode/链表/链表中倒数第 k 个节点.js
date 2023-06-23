// 链表中倒数第 k 个节点

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var getKthFromEnd = function (head, k) {
  let right = head
  let left = head
  // right先走k步 目的是让right和left之间相差k步ƒ
  while (k--) right = right.next
  // right走到头 left就是倒数第k个节点
  // 不能是right.next 因为right走了k步 left也要走k步
  // 如果right.next为null left就是倒数第k+1个节点
  while (right) { // 所以这里是right不为null
    right = right.next
    left = left.next
  }
  return left
};
