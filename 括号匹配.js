var isValid = function (s) {
  while (s.length) {
    const temp = s
    s = s.replace('()', '').replace('{}', '').replace('[]', '')
    if (temp === s) return false
  }
  return true
};
console.log(isValid("()"));
