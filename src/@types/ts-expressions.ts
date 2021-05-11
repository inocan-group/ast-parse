import { ITsTokenCommentSections, TsBodyLoc } from "./ts-patterns";

export interface ITsArrowFunctionExpression {
  type: "ArrowFunctionExpression";
  id: null | unknown;
  params: unknown[];
  body: {
    type: "Literal" | string;
    value: string | unknown;
    /** appears to be an escaped version of "value" */
    raw: string | unknown;
    loc: TsBodyLoc;
  };
  generator: boolean;
  expression: true;
  async: boolean;
  loc: TsBodyLoc;
}

export interface ITsMemberExpression {
  type: "MemberExpression";
  computed: boolean;
  object: {
    type: "Identifier" | unknown;
    name: string;
    loc: TsBodyLoc;
  };
  property: {
    type: "Identifier" | unknown;
    name: string;
    loc: TsBodyLoc;
  };
}

export interface ITsCallExpression {
  type: "CallExpression";
  callee: ITsMemberExpression;
}

export interface ITsIdentifierExpression extends ITsTokenCommentSections {
  type: "Identifier";
  name: string;

  start: unknown;
  end: unknown;
  range: unknown;
  extra: unknown;
  loc: TsBodyLoc;
}

export interface ITsTemplateLiteralExpression {
  type: "TemplateLiteral";
  name: string;
  expressions: ITsIdentifierExpression[];
  start: unknown;
  end: unknown;
  range: unknown;
  extra: unknown;
  loc: TsBodyLoc;
}

export type ITsExpression =
  | ITsCallExpression
  | ITsArrowFunctionExpression
  | ITsMemberExpression
  | ITsTemplateLiteralExpression
  | ITsIdentifierExpression;
