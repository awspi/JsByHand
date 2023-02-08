function copy(obj) {
  function F() { }
  F.prototype = obj
  return new F()
}
function createObject(obj) {
  const o = copy(obj)
  o.getNames = function () {
    console.log(this.names);
    return this.names
  }
  return o
}
