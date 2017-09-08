import {
  rewriteModuleStatementsAndPrepareHeader,
  getSourceMetadataArray,
  buildNamespaceInitStatements,
  ensureStatementsHoisted,
  wrapInterop,
} from "babel-helper-modules";

export default function({ types: t }) {
  return {
    visitor: {
      Program: {
        exit(path, state) {
          const {
            loose,
            allowTopLevelThis,
            strict,
            strictMode,
            noInterop,
          } = state.opts;

          // Rename the bindings auto-injected into the scope so there is no
          // risk of conflict between the bindings.
          path.scope.rename("exports");
          path.scope.rename("module");
          path.scope.rename("require");
          path.scope.rename("__filename");
          path.scope.rename("__dirname");

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          const {
            meta,
            headers,
          } = rewriteModuleStatementsAndPrepareHeader(path, {
            exportName: "exports",
            loose,
            strict,
            strictMode,
            allowTopLevelThis,
            noInterop,
          });

          getSourceMetadataArray(
            meta,
          ).forEach(([source, metadata, isSideEffect]) => {
            const loadExpr = t.callExpression(t.identifier("require"), [
              t.stringLiteral(source),
            ]);

            let header;
            if (isSideEffect) {
              header = t.expressionStatement(loadExpr);
            } else {
              header = t.variableDeclaration("var", [
                t.variableDeclarator(
                  t.identifier(metadata.name),
                  wrapInterop(path, loadExpr, metadata.interop) || loadExpr,
                ),
              ]);
            }
            header.loc = metadata.loc;

            headers.push(header);
            headers.push(...buildNamespaceInitStatements(meta, metadata));
          });

          ensureStatementsHoisted(headers);
          path.unshiftContainer("body", headers);
        },
      },
    },
  };
}
