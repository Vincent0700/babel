var _deep$obj, _deep$obj2, _deep$obj3, _deep$obj4;

var x = 0;
var sets = 0;
var obj = {
  get x() {
    return x;
  },

  set x(value) {
    sets++;
    x = value;
  }

};
assert.equal(obj.x || (obj.x = 1), 1);
assert.equal(sets, 1);
assert.equal(obj.x || (obj.x = 2), 1);
assert.equal(sets, 1);
assert.equal(obj.x && (obj.x = 0), 0);
assert.equal(sets, 2);
assert.equal(obj.x && (obj.x = 3), 0);
assert.equal(sets, 2);
var gets = 0;
var deep = {
  get obj() {
    gets++;
    return obj;
  }

};
assert.equal((_deep$obj = deep.obj).x || (_deep$obj.x = 1), 1);
assert.equal(gets, 1);
assert.equal((_deep$obj2 = deep.obj).x || (_deep$obj2.x = 2), 1);
assert.equal(gets, 2);
assert.equal((_deep$obj3 = deep.obj).x && (_deep$obj3.x = 0), 0);
assert.equal(gets, 3);
assert.equal((_deep$obj4 = deep.obj).x && (_deep$obj4.x = 3), 0);
assert.equal(gets, 4);
