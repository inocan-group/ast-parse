import { keys } from "native-dash";
import { ITsExpression, ITsExtractedExpression } from "~/@types";

export function extractTsExpression(exp: ITsExpression): ITsExtractedExpression {
  switch (exp.type) {
    case "ArrowFunctionExpression":
      return {
        scope: "expression",
        kind: "function",
        type: exp.type,
        bodyType: exp.body.type,
        body: exp.body.value,
      };
    case "MemberExpression":
      return {
        scope: "expression",
        kind: "member",
        type: exp.type,
        objName: exp.object.name,
        propName: exp.property.name,
      };
    case "CallExpression":
      return {
        scope: "expression",
        kind: "call",
        type: exp.type,
        callee: extractTsExpression(exp.callee),
      };
    case "Identifier":
      return {
        scope: "expression",
        kind: "identifier",
        type: exp.type,
        name: exp.name,
      };
    case "TemplateLiteral":
      return {
        scope: "expression",
        kind: "literal",
        type: exp.type,
        name: exp.name,
        expressions: exp.expressions.map((e) => extractTsExpression(e)),
      };

    case "StringLiteral":
      return {
        scope: "expression",
        kind: "literal",
        type: exp.type,
        name: exp.name,
        value: exp.value,
      };

    case "NumericLiteral":
      return {
        scope: "expression",
        kind: "literal",
        type: exp.type,
        name: exp.name,
        value: exp.value,
      };

    case "TemplateElement":
      return {
        scope: "expression",
        kind: "template",
        type: exp.type,
        name: exp.name,
        value: exp.value,
      };

    default:
      return {
        scope: "expression",
        kind: "unknown",
        type: (exp as any)?.type + "[unknown]" || "unknown",
        name: (exp as any)?.name,
        props: keys(exp),
      };
  }
}
