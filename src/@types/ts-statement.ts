import { ITsExpression, ITsTemplateElement } from "./ts-expressions";
import { ITsTokenCommentSections, TsBodyLoc } from "./ts-patterns";

export interface ITsBlockStatement extends ITsTokenCommentSections {
  type: "BlockStatement";
  // eslint-disable-next-line no-use-before-define
  body: ITsStatement[];
}

export interface ITsExpressionStatement extends ITsTokenCommentSections {
  type: "ExpressionStatement";
  expression: ITsExpression;
  loc: TsBodyLoc;
}

export interface ITsIfStatement extends ITsTokenCommentSections {
  type: "IfStatement";
  loc: TsBodyLoc;
  consequent: ITsBlockStatement;
  alternate: null | unknown;
  test: ITsExpression;
}

export interface ITsReturnStatement extends ITsTokenCommentSections {
  type: "ReturnStatement";
  argument: {
    type: string;
    quasis: ITsTemplateElement[];
    expressions: ITsExpression[];

    start: unknown;
    end: unknown;
    loc: TsBodyLoc;
    range: unknown;
    extra: unknown;
  };
  loc: TsBodyLoc;
}

export type ITsStatement =
  | ITsBlockStatement
  | ITsExpressionStatement
  | ITsIfStatement
  | ITsReturnStatement;
