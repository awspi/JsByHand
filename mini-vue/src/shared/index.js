/**
 *  判断是否是对象 (排除null)
 */
export function isObject(val) {
  return typeof val === "object" && val !== null
}
