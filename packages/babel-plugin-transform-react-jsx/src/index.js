import jsx from "babel-plugin-syntax-jsx";
import helper from "babel-helper-builder-react-jsx";

export default function({ types: t }) {
  const visitor = helper({
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;
      if (t.react.isCompatTag(tagName)) {
        args.push(t.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    },
  });

  visitor.Program = function(path, state) {
    const id = state.opts.pragma || "React.createElement";

    state.set("jsxIdentifier", () =>
      id
        .split(".")
        .map(name => t.identifier(name))
        .reduce((object, property) => t.memberExpression(object, property)),
    );
  };

  visitor.JSXAttribute = function(path) {
    if (t.isJSXElement(path.node.value)) {
      path.node.value = t.jSXExpressionContainer(path.node.value);
    }
  };

  return {
    inherits: jsx,
    visitor,
  };
}
