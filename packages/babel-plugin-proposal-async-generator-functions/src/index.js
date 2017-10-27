import remapAsyncToGenerator from "@babel/helper-remap-async-to-generator";
import syntaxAsyncGenerators from "@babel/plugin-syntax-async-generators";

export default function({ types: t }) {
  const yieldStarVisitor = {
    Function(path) {
      path.skip();
    },

    YieldExpression({ node }, state) {
      if (!node.delegate) return;
      const callee = state.addHelper("asyncGeneratorDelegate");
      node.argument = t.callExpression(callee, [
        t.callExpression(state.addHelper("asyncIterator"), [node.argument]),
        state.addHelper("awaitAsyncGenerator"),
      ]);
    },
  };

  return {
    inherits: syntaxAsyncGenerators,
    visitor: {
      Function(path, state) {
        if (!path.node.async || !path.node.generator) return;

        path.traverse(yieldStarVisitor, state);

        remapAsyncToGenerator(path, state.file, {
          wrapAsync: state.addHelper("wrapAsyncGenerator"),
          wrapAwait: state.addHelper("awaitAsyncGenerator"),
        });
      },
    },
  };
}
