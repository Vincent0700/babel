var Test = function (_Foo) {
  babelHelpers.inherits(Test, _Foo);

  function Test() {
    return _Foo.apply(this, arguments) || this;
  }

  return Test;
}(Foo);
