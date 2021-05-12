/* eslint-disable no-use-before-define */
export interface ITsExtractedArrowFunction {
  scope: "expression";
  kind: "function";
  type: "ArrowFunctionExpression";
  bodyType: string;
  body: any;
  name?: string;
}

export interface ITsExtractedMemberExpression {
  scope: "expression";
  kind: "member";
  type: "MemberExpression";
  objName: string;
  propName: string;
  name?: string;
}

export interface ITsExtractedCallExpression {
  scope: "expression";
  kind: "call";
  type: "CallExpression";
  callee: ITsExtractedExpression;
  name?: string;
}

export interface ITsExtractedIdentifier {
  scope: "expression";
  kind: "identifier";
  type: "Identifier";
  name: string;
}

export interface ITsExtractedTemplateLiteral {
  scope: "expression";
  kind: "literal";
  type: "TemplateLiteral";
  name: string;
  expressions: ITsExtractedExpression[];
}

export interface ITsExtractedStringLiteral {
  scope: "expression";
  kind: "literal";
  type: "StringLiteral";
  name: string;
  value: string;
}

export interface ITsExtractedNumericLiteral {
  scope: "expression";
  kind: "literal";
  type: "NumericLiteral";
  name: string;
  value: number;
}

export interface ITsExtractedTemplateElement {
  scope: "expression";
  kind: "template";
  type: "TemplateElement";
  name: string;
  value: any;
}

export interface ITsExtractedUnknownExpression {
  scope: "expression";
  kind: "unknown";
  type: string;
  name: string;
  props: string[];
}

export type ITsExtractedExpression =
  | ITsExtractedUnknownExpression
  | ITsExtractedTemplateElement
  | ITsExtractedNumericLiteral
  | ITsExtractedStringLiteral
  | ITsExtractedTemplateLiteral
  | ITsExtractedIdentifier
  | ITsExtractedCallExpression
  | ITsExtractedMemberExpression
  | ITsExtractedArrowFunction;
