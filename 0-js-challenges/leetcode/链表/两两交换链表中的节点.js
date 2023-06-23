// 两两交换链表中的节点
// https://leetcode.cn/problems/swap-nodes-in-pairs/solutions/444579/shou-hua-tu-jie-24-liang-liang-jiao-huan-lian-biao/

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
var swapPairs = function (head) {
  const dummy = new ListNode()
  // 
  dummy.next = head
  let prev = dummy
  while (head && head.next) {
    const next = head.next // 临时保存head.next
    head.next = next.next  // 1
    next.next = head       // 2
    prev.next = next       // 3
    //指针更新 
    prev = head
    head = head.next
  }
  return dummy.next
};
