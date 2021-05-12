/* eslint-disable no-use-before-define */
import { isNonNullObject } from "common-types";
import { ITsComment } from "./ts-comments";
import { ITsExpression } from "./ts-expressions";
import { ITsTokenCommentSections, TsBodyLoc, TsVariableKind } from "./ts-patterns";
import { ITsSpecifier } from "./ts-specifiers";
import { ITsBlockStatement } from "./ts-statement";

/** type-guard to validate that a given declaration has a singular declaration */
export function hasDeclaration(thing: unknown): thing is { declaration: ITsDeclaration } {
  return isNonNullObject(thing) && (thing as { declaration: any }).declaration !== undefined;
}
/** type-guard to validate that given declaration has an array of declarations */
export function hasDeclarations(thing: unknown): thing is { declarations: ITsDeclaration[] } {
  return isNonNullObject(thing) && Array.isArray((thing as { declarations: any }).declarations);
}

export interface ITsVariableDeclarator {
  type: "VariableDeclarator";
  id: {
    type: "Identifier" | unknown;
    name: string;
    loc: TsBodyLoc;
  };
  init: ITsExpression;
  loc: TsBodyLoc;
}

export interface ITsVariableDeclaration {
  type: "VariableDeclaration";
  declarations: ITsVariableDeclarator[];
  kind: TsVariableKind | unknown;
  loc: TsBodyLoc;
}

export function isVariableDeclaration(thing: unknown): thing is ITsVariableDeclaration {
  return isNonNullObject(thing) && (thing as { type: string }).type === "VariableDeclaration";
}

export interface ITsImportDeclaration extends ITsTokenCommentSections {
  type: "ImportDeclaration";
  importKind: string;
  specifiers: ITsSpecifier[];
  source: ITsExpression;
  comments: ITsComment[];

  [key: string]: any;
}

export interface ITsExportDefaultDeclaration {
  type: "ExportDefaultDeclaration";
  declaration: ITsVariableDeclaration | ITsFunctionDeclaration;
  loc: TsBodyLoc;
}

export function isExportDefaultDeclaration(thing: unknown): thing is ITsExportDefaultDeclaration {
  return isNonNullObject(thing) && (thing as { type: string }).type === "ExportDefaultDeclaration";
}

export interface ITsTypeAnnotation {
  type: string;
  typeAnnotation: ITsTypeAnnotation;
}

export interface ITsParam {
  name: string;
  type: string;
  start: unknown;
  end: unknown;
  loc: TsBodyLoc;
  range: unknown;
  leadingComments: ITsComment[];
  trailingCommments: ITsComment[];
  innerComments: ITsComment[];
  extra: unknown;
  typeAnnotation: ITsTypeAnnotation;
}

export interface ITsFunctionDeclaration {
  type: "FunctionDeclaration";
  id: {
    type: "Identifier";
    name: string;
    loc: TsBodyLoc;
  };
  params: ITsParam[];
  body: ITsBlockStatement;
  generator: boolean;
  expression: boolean;
  async: boolean;
  loc: TsBodyLoc;
  comments: ITsComment[];
}

export function isFunctionDeclaration(thing: unknown): thing is ITsFunctionDeclaration {
  return isNonNullObject(thing) && (thing as { type: string }).type === "FunctionDeclaration";
}

export interface ITsExportNamedDeclaration {
  type: "ExportNamedDeclaration";
  declaration: ITsVariableDeclaration | ITsFunctionDeclaration;
  specifiers: ITsSpecifier[];
  source: null | ITsExpression;
  loc: TsBodyLoc;
  comments: ITsComment[];
}

export function isExportNamedDeclaration(thing: unknown): thing is ITsExportNamedDeclaration {
  return isNonNullObject(thing) && (thing as { type: string }).type === "ExportNamedDeclaration";
}

export type ITsDeclaration =
  | ITsVariableDeclaration
  | ITsImportDeclaration
  | ITsExportDefaultDeclaration
  | ITsExportNamedDeclaration
  | ITsFunctionDeclaration;
