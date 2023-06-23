// 合并两个排序的链表

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let p1 = l1, p2 = l2, dummy = new ListNode(), curr = dummy
  while (p1 && p2) {
    if (p1.val < p2.val) {
      curr.next = p1
      p1 = p1.next
    } else {
      curr.next = p2
      p2 = p2.next
    }
    curr = curr.next
  }
  // 若是p1或p2还有剩余节点 直接拼接到curr后面
  curr.next = p1 ? p1 : p2
  return dummy.next
};
