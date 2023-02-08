var id = 'GLOBAL';
var obj = {
  id: 'OBJ',
  a: function () {
    console.log(this.id);
  },
  b: () => {
    console.log(this.id);
  }
};

obj.a();    // 'OBJ'
obj.b.call(obj);    // 'GLOBAL'
