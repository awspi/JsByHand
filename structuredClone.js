const obj = {
  name: '123',
  age: 22,
  obj2: {
    asd: '123s',
    zxc: 11
  },
}
const a = structuredClone(obj)
console.log(a);
