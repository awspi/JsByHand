a ||= b
//*等价于
if (!a) a = b;
// 或者
a = a ? a : b;
//? 结合空值合并 实现短路赋值
a = a ?? b;
a ??= b;
//? 举例 懒初始化
let arr
//如果arr不存在就设置为空数组再push
//如果arr存在就直接push
(arr ??= []).push("asd");

//* 等价于
arr = arr ?? []; // 假设 arr 有可能在多处被初始化
arr.push("asd");
