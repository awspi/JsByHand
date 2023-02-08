// 逻辑或|| 提供默认值
const foo = someValue || fallbackValue;
// 逻辑或会在 || 左边被判断为 false 时，执行右边的逻辑，在这里即是赋值行为
// 由于隐式转换，如果 || 左边是 ""/ 0 / false
// 都会被视为 false（false 虽然是 false，但它也是个值！）

const bar = obj?.a?.b?.c() ?? fallbackValue;
