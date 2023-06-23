//删除排序链表中的重复元素
// https://leetcode.cn/problems/remove-duplicates-from-sorted-list/solutions/

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
var deleteDuplicates = function (head) {
  let curr = head
  while (curr?.next) {
    if (curr.val === curr.next.val) {
      curr.next = curr.next.next
    } else {
      // 如果不相等，curr指针后移
      // 相等就不移动 因为 curr.next已经指向下一个节点了
      curr = curr.next
    }
  }
  return head
};
