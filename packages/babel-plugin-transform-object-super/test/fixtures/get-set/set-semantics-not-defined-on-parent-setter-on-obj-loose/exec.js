var Base = {
};

var value = 2;
var obj = {
  set test(v) {
    value = v;
  },

  set() {
    return super.test = 3;
  },
};
Object.setPrototypeOf(obj, Base);

assert.equal(obj.set(), 3);
assert.equal(Base.test, undefined);
assert.equal(value, 2);
assert.equal(obj.test, undefined);
