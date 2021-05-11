import { keys } from "native-dash";
import {
  hasDeclaration,
  hasDeclarations,
  isExportDefaultDeclaration,
  isExportNamedDeclaration,
  isFunctionDeclaration,
  isVariableDeclaration,
  ITsDeclaration,
  ITsStatement,
} from "~/@types";
import { extractTsExpression } from "~/extractors/extractTsExpression";
import { extractTsStatement } from "~/extractors/extractTsStatement";
import { parseWithTypescript } from "../parseWithTypescript";

export type ITsAstInfo = {
  type: ITsDeclaration["type"];
  declaration?: string;
  declarations?: string[];
} & { [key: string]: unknown };

export function getDeclarations(content: string) {
  const ast = parseWithTypescript(content);
  return ast.program.body.map((i) => {
    let info: ITsAstInfo = {
      type: i.type,
      declarationType: i?.declaration?.type,
      declarationKind: i?.declaration?.kind,
      declarationCommentCount: i?.declaration?.comments?.length,
      declarationsCount: hasDeclaration(i)
        ? i.declaration?.declarations?.length
        : hasDeclarations(i)
        ? i.declarations.length
        : 0,
    };
    if (isExportDefaultDeclaration(i)) {
      info = { ...info, declarationName: i.declaration.name, kind: "default-export" };
    }

    // #region NAMED EXPORTS
    if (isExportNamedDeclaration(i)) {
      info = {
        ...info,
        family: "export",
        kind: "named-export",
      };

      // Named Export as a set of variables (often just a singular variable though)
      if (isVariableDeclaration(i.declaration)) {
        info = {
          ...info,
          exportType: "variable",
          variableKind: i.declaration.kind,
          variables: isVariableDeclaration(i.declaration)
            ? i.declaration?.declarations
                ?.filter((k) => k.type === "VariableDeclarator")
                .map((k) => ({
                  name: k.id.name,
                  init: k?.init?.type,
                }))
            : [],
        };
      } else if (isFunctionDeclaration(i.declaration)) {
        // Named Export is a function
        const statementDetail = (stmt: ITsStatement) => {
          switch (stmt.type) {
            case "IfStatement":
              return {
                type: stmt.type,
                consequent: {
                  type: stmt.consequent.type,
                  body: stmt.consequent.body.map((b) => b.type),
                  directives: stmt.consequent.directives.map((d) => d.type),
                },
                alternate: stmt.alternate,
                test: keys(stmt.test),
              };
            case "ReturnStatement":
              return {
                type: stmt.type,
                argument: keys(stmt.argument),
              };
            case "ExpressionStatement":
              return {
                type: stmt.type,
                expression: extractTsExpression(stmt.expression),
              };
            default:
              return { type: stmt.type };
          }
        };

        info = {
          ...info,
          exportType: "function",
          name: i.declaration.id.name,
          isAsync: i.declaration.async,
          params: i.declaration.params.map((p) => ({
            name: p.name,
            type: p.type,
            typeAnnotation:
              p.typeAnnotation.type === "TSTypeAnnotation"
                ? p.typeAnnotation.typeAnnotation.type
                : p.typeAnnotation,
          })),
          body:
            i.declaration.body.type === "BlockStatement"
              ? i.declaration.body.body.map((b) => extractTsStatement(b))
              : "non-block statement",
        };
      }
    }
    // #endregion

    if (isFunctionDeclaration(i)) {
      info = {
        ...info,
        kind: "local-symbol",
        name: i.id.name,
        params: i.params,
        async: i.async,
        hasComments: i.comments.length > 0,
      };
    }

    if (isVariableDeclaration(i)) {
      info = {
        ...info,
        kind: "local-symbol",
      };
    }

    return info;
  });
}
