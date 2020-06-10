const types = require("./packages/babel-types");
const parser = require("./packages/babel-parser");
const traverse = require("./packages/babel-traverse").default;
const generator = require("./packages/babel-generator").default;

const transformSliceExpressionPlugin = {
  visitor: {
    ExpressionStatement(path) {
      if (
        path.node.expression.type === "MemberExpression" &&
        path.node.expression.property.type === "SliceExpression"
      ) {
        const { object, property } = path.node.expression;
        const { lower, upper } = property;
        const memberExpression = types.memberExpression(
          object,
          types.identifier("slice")
        );
        const callExpression = types.callExpression(memberExpression, [
          lower,
          upper,
        ]);
        const expressionStatement = types.expressionStatement(callExpression);
        path.replaceWith(expressionStatement);
      }
    },
  },
};

// test
const code = "a[1:3]";
const ast = parser.parse(code);
traverse(ast, transformSliceExpressionPlugin.visitor);
const result = generator(ast);

console.log(result.code);
