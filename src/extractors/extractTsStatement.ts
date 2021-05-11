import { keys } from "native-dash";
import { ITsStatement } from "~/@types";
import { extractTsExpression } from "./extractTsExpression";

/**
 * Extracts useful information from an "statement" in a Typescript AST tree
 */
export function extractTsStatement(stmt: ITsStatement) {
  switch (stmt.type) {
    case "BlockStatement":
      return {
        type: stmt.type,
        body: stmt.body.map((i) => extractTsStatement(i)),
      };

    case "ExpressionStatement":
      return {
        type: stmt.type,
        expression: extractTsExpression(stmt.expression),
      };

    case "IfStatement":
      return {
        type: stmt.type,
        consequent: {
          type: stmt.consequent.type,
          body: stmt.consequent.body.map((i) => extractTsStatement(i)),
        },
        alternate: stmt.alternate,
        test: {
          type: stmt.test.type,
          name: stmt.test.name,
        },
      };

    case "ReturnStatement":
      return {
        type: stmt.type,
        argument: {
          type: stmt.argument.type,
          // quasis: stmt.argument.quasis.map(q => {(
          //   type: q.type,
          // })),
          expressions: stmt.argument.expressions.map((e) => extractTsExpression(e)),
        },
      };

    default:
      return { type: (stmt as any)?.type };
  }
}
