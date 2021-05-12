/* eslint-disable no-use-before-define */
import { isNonNullObject } from "common-types";
import { ITsExtractedExpression, ITsExtractedSpecifier, ITsExtractedStatement } from ".";

export type ITsExtractedDefaultExport = {
  scope: "declaration";
  kind: "export";
  type: "ExportDefaultDeclaration";
  declaration: ITsExtractedDeclaration;
};

export type ITsExtractedNamedExport = {
  scope: "declaration";
  kind: "export";
  type: "ExportNamedDeclaration";
  declaration: ITsExtractedDeclaration;
  source: null | ITsExtractedExpression;
  specifiers: ITsExtractedSpecifier[];
};

export type ITsExtractedFunctionDeclaration = {
  scope: "declaration";
  type: "FunctionDeclaration";
  kind: "function";

  name: string;
  isAsync: boolean;
  isExpression: boolean;
  isGenerator: boolean;
  params: Array<{
    name: string;
    type: string;
    typeAnnotation: string;
  }>;

  body: ITsExtractedStatement[];
};

export type ITsExtractedVariableDeclaration = {
  scope: "declaration";
  kind: "variable";
  type: "VariableDeclaration";
  declarations: {
    name: string;
    init: ITsExtractedExpression;
  }[];
};

export type ITsExtractedImportDeclaration = {
  scope: "declaration";
  kind: "import";
  type: "ImportDeclaration";
  importKind: string;
  source: ITsExtractedExpression;
  specifiers: ITsExtractedSpecifier[];
};

export type ITsExtractedUnknownDeclaration = {
  scope: "declaration";
  kind: "unknown";
  type: string;
  message: string;
  props: string[];
};

export type ITsExtractedDeclaration =
  | ITsExtractedDefaultExport
  | ITsExtractedNamedExport
  | ITsExtractedImportDeclaration
  | ITsExtractedFunctionDeclaration
  | ITsExtractedVariableDeclaration
  | ITsExtractedUnknownDeclaration;

export function isExtractedImport(thing: unknown): thing is ITsExtractedImportDeclaration {
  return (
    isNonNullObject(thing) &&
    (thing as { type: string })?.type === "ImportDeclaration" &&
    (thing as any)?.kind === "import"
  );
}

export function isExtractedNamedExport(thing: unknown): thing is ITsExtractedNamedExport {
  return (
    isNonNullObject(thing) &&
    (thing as { type: string })?.type === "ExportNamedDeclaration" &&
    (thing as any)?.scope === "declaration"
  );
}

export function isExtractedDefaultExport(thing: unknown): thing is ITsExtractedDefaultExport {
  return (
    isNonNullObject(thing) &&
    (thing as { type: string })?.type === "ExportDefaultDeclaration" &&
    (thing as any)?.scope === "declaration"
  );
}

export function isExtractedFunction(thing: unknown): thing is ITsExtractedFunctionDeclaration {
  return (
    isNonNullObject(thing) &&
    (thing as any)?.scope === "declaration" &&
    (thing as any)?.type === "FunctionDeclaration"
  );
}

export function isExtractedVariable(thing: unknown): thing is ITsExtractedVariableDeclaration {
  return (
    isNonNullObject(thing) &&
    (thing as any)?.scope === "declaration" &&
    (thing as any)?.type === "VariableDeclaration"
  );
}
