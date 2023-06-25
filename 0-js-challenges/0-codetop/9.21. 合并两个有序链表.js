// 
// https://leetcode.cn/problems/merge-two-sorted-lists/description/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode() // 哨兵节点
  let l1 = list1, l2 = list2 // 两个指针
  // curr指针指向哨兵节点
  let curr = dummy
  // 两个指针都不为空时
  while (l1 && l2) {
    if (l1.val < l2.val) {
      //如果l1的值小于l2的值，那么curr.next指向l1
      curr.next = l1
      // l1指针后移
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }
  curr.next = l1 ? l1 : l2
  return dummy.next
};
