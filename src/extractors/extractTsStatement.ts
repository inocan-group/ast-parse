import { ITsStatement, ITsExtractedStatement } from "~/@types";
import { extractTsExpression } from "./extractTsExpression";

/**
 * Extracts useful information from an "statement" in a Typescript AST tree
 */
export function extractTsStatement(stmt: ITsStatement): ITsExtractedStatement {
  switch (stmt.type) {
    case "BlockStatement":
      return {
        scope: "statement",
        kind: "block",
        type: stmt.type,
        body: stmt.body.map((i) => extractTsStatement(i)),
      };

    case "ExpressionStatement":
      return {
        scope: "statement",
        kind: "expression",
        type: stmt.type,
        expression: extractTsExpression(stmt.expression),
      };

    case "IfStatement":
      return {
        scope: "statement",
        kind: "conditional",
        type: stmt.type,
        consequent: extractTsStatement(stmt.consequent),
        alternate: stmt.alternate,
        test: extractTsExpression(stmt.test),
      };

    case "ReturnStatement":
      return {
        scope: "statement",
        kind: "return",
        type: stmt.type,
        argument: {
          type: stmt.argument.type,
          quasis: stmt.argument.quasis.map((q) => extractTsExpression(q)),
          expressions: stmt.argument.expressions.map((e) => extractTsExpression(e)),
        },
      };

    default:
      return {
        scope: "statement",
        kind: "unknown",
        type: (stmt as any)?.type,
      };
  }
}
