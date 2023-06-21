// abbc->ac
// aaa->a
const fn = (str) => {
  let stack = []
  for (let i = 0; i < str.length; i++) {
    if (stack.at(-1) === str[i]) {
      stack.pop()
    } else {
      stack.push(str[i])
    }
  }
  return stack.join('')
}
console.log(fn('abbc'));
console.log(fn('aaa'));


// aaabbac->ac
// baaa->b

function removeDuplicates(str) {
  const stack = [];

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== stack[stack.length - 1]) {
      stack.push(str[i]);
    }
  }

  return stack.join('');
}

console.log(removeDuplicates('aaabbac')); //ac
console.log(removeDuplicates('baaa')); //b

