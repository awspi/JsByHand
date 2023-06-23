// 环形链表
// https://leetcode.cn/problems/linked-list-cycle/solutions/1524237/dai-ma-jian-ji-de-jie-fa-jsban-ben-by-it-rm37/


/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  // 若是环形链表快指针总会和慢指针相遇
  if (!head) return false
  let slow = head
  let fast = head.next // 快指针先走一步
  while (fast && fast.next) {
    // 若是环形链表 快指针总会和慢指针相遇
    // 因为fast走2步 slow走1步 slow的下一个节点和fast的下下个节点相等 就是相遇了
    if (slow.next === fast.next.next) return true
    // 快指针走两步 慢指针走一步
    slow = slow.next
    fast = fast.next.next
  }
  return false
};
