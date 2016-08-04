var es2015 = require("../lib");
var assert = require("assert");
var expect = require("chai").expect;

suite("es2015 preset", function () {
  test("exposes a function", function () {
    expect(typeof es2015).to.equal("function");
  });

  test("exposes a separate list of plugins", function () {
    expect(Array.isArray(es2015.plugins)).to.equal(true);
  });

  test("doesn't throw with no options passed", function () {
    expect(function () {
      es2015(null);
    }).not.to.throw();
  })

  suite("options", function () {
    suite("loose", function () {
      test("throws on non-boolean value", function () {
        expect(function () {
          es2015(null, { loose: 1});
        }).to.throw(/must be a boolean/);
      });
    });

    test("modules", function () {
      test("doesn't throw when passing one false", function () {
        expect(function () {
          es2015(null, { loose: false });
        }).not.to.throw();
      });

      test("doesn't throw when passing one of: 'commonjs', 'amd', 'umd', 'systemjs", function () {
        expect(function () {
          es2015(null, { loose: "commonjs" });
        }).not.to.throw();

        expect(function () {
          es2015(null, { loose: "amd" });
        }).not.to.throw();

        expect(function () {
          es2015(null, { loose: "umd" });
        }).not.to.throw();

        expect(function () {
          es2015(null, { loose: "systemjs" });
        }).not.to.throw();
      });
    });
  });
});
