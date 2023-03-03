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
  let prev = null
  let curr = head
  // 直到当前节点为尾节点的节点null
  while (curr) {
    // prev curr curr.next 
    const next = curr.next
    // 将当前节点的指针指向上一个节点
    curr.next = prev
    // 然后更新当前节点和下一个节点的值 向后顺移
    prev = curr
    curr = next
  }
  return prev
};
