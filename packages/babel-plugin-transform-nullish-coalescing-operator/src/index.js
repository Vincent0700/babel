import syntaxNullishCoalescingOperator from "@babel/plugin-syntax-nullish-coalescing-operator";

export default function({ types: t }) {
  return {
    inherits: syntaxNullishCoalescingOperator,

    visitor: {
      LogicalExpression(path) {
        const { node, scope } = path;
        if (node.operator !== "??") {
          return;
        }

        const ref = scope.generateUidIdentifierBasedOnNode(node.left);
        scope.push({ id: ref });

        path.replaceWith(
          t.sequenceExpression([
            t.assignmentExpression("=", ref, node.left),
            t.conditionalExpression(
              // We cannot use `!= null` here because `document.all == null`
              // and `document.all` has been deemed not "nullish".
              t.logicalExpression(
                "&&",
                t.binaryExpression("!==", t.clone(ref), t.nullLiteral()),
                t.binaryExpression(
                  "!==",
                  t.clone(ref),
                  scope.buildUndefinedNode(),
                ),
              ),
              t.clone(ref),
              node.right,
            ),
          ]),
        );
      },
    },
  };
}
