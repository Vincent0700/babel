var Foo =
/*#__PURE__*/
function (_Bar) {
  "use strict";

  babelHelpers.inherits(Foo, _Bar);

  function Foo() {
    var _this;

    babelHelpers.classCallCheck(this, Foo);

    if (condition) {
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));

      _bar.set(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this))), "foo");
    } else {
      _this = babelHelpers.possibleConstructorReturn(this, babelHelpers.getPrototypeOf(Foo).call(this));

      _bar.set(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(babelHelpers.assertThisInitialized(_this))), "foo");
    }

    return babelHelpers.possibleConstructorReturn(_this);
  }

  return Foo;
}(Bar);

var _bar = new WeakMap();
