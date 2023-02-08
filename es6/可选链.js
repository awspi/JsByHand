// 访问一个嵌套多层的属性，为了避免出现 Cannot read property of undefined 
// 通常会使用逻辑与 && 语法来确保在某一层出现空值时及时短路掉访问
// 在某一步访问出现空值时，它返回的是上一步的值
const inner = obj && obj.data && obj.data.innerProperty;
//? 逻辑与短路在属性嵌套过深时简直就是噩梦，使用可选链的 ?. 语法
//? 可选链也更符合我们的预期：它会在短路时返回一个 undefined
//? 可选链不仅能应用在属性访问也可以用在计算属性访问以及方法调用
obj?.[expr];
obj?.[++a];
// 对应到 obj.func && obj.func()
obj?.func();
// 在所有情况下，如果 ?. 的左侧发生了短路，那么就会直接停止后续操作，
// 比如不会去运行并计算表达式 expr 以及 ++a 
