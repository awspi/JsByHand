// 找到环形链表的入口
https://leetcode.cn/problems/linked-list-cycle-ii



var detectCycle = function (head) {
  if (!head) return null
  var map = new WeakMap()
  while (head.next) {
    // 如果下一个节点已经在map中存在，说明是环形链表
    if (map.get(head.next)) {
      return head.next
    }
    // 保存当前节点
    map.set(head, true)
    // 当前节点后移
    head = head.next
  }
  return null
};

