import { ITsExpression } from "./ts-expressions";
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
  consequent: {
    type: string;
    start: unknown;
    end: unknown;
    loc: TsBodyLoc;
    range: unknown;
    body: ITsBlockStatement[];
    directives: { type: string }[];
  };
  alternate: null | unknown;
  test: {
    type: string;
    name: string;
    start: unknown;
    end: unknown;
    loc: TsBodyLoc;
    range: unknown;
    extra: unknown;
  };
}

export interface ITsQuasis extends ITsTokenCommentSections {
  type: string;
  value: any;
  tail: any;

  start: unknown;
  end: unknown;
  loc: TsBodyLoc;
  range: unknown;
  extra: unknown;
}

export interface ITsReturnStatement extends ITsTokenCommentSections {
  type: "ReturnStatement";
  argument: {
    type: string;
    quasis: ITsQuasis[];
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
