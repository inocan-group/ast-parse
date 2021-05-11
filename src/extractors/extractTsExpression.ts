import { keys } from "native-dash";
import { ITsExpression } from "~/@types";

export interface IExtractedExpression {
  type: string;
  name?: string;
  bodyType?: string;
  body?: any;
  objType?: string;
  objName?: string;
  propName?: string;
  callee?: any;
  expressions?: any;
  props?: any;
}

export function extractTsExpression(exp: ITsExpression): IExtractedExpression {
  switch (exp.type) {
    case "ArrowFunctionExpression":
      return {
        type: exp.type,
        bodyType: exp.body.type,
        body: exp.body.value,
      };
    case "MemberExpression":
      return {
        type: exp.type,
        objName: exp.object.name,
        propName: exp.property.name,
      };
    case "CallExpression":
      return {
        type: exp.type,
        callee: extractTsExpression(exp.callee),
      };
    case "Identifier":
      return {
        type: exp.type,
        name: exp.name,
      };
    case "TemplateLiteral":
      return {
        type: exp.type,
        name: exp.name,
        expressions: exp.expressions.map((e) => extractTsExpression(e)),
      };

    default:
      return {
        type: (exp as any)?.type + "[unknown]" || "unknown",
        name: (exp as any)?.name,
        props: keys(exp),
      };
  }
}
