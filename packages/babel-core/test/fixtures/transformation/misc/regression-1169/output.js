function foo() {
  var input = ['a', 'b', 'c'];
  var output = {};
  var _arr = input;

  for (var _i = 0; _i < _arr.length; _i++) {
    var c = _arr[_i];
    var name = c;
    output[name] = name;
  }

  return output;
}
