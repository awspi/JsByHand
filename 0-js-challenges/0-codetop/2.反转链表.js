// 206. 反转链表

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let curr = head
  let prev = null
  while (curr) {
    // 保存下一个节点
    const next = curr.next
    // 反转指针
    curr.next = prev
    // 指针后移
    prev = curr
    curr = next
  }
  return prev // prev指向最后一个节点 最后curr指向null
};
