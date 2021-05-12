/* eslint-disable no-use-before-define */
import { keys } from "native-dash";
import { ITsDeclaration } from "~/@types";
import { extractTsExpression, ITsExtractedExpression } from "./extractTsExpression";
import { extractTsSpecifiers, ITsExtractedSpecifier } from "./extractTsSpecifiers";
import { extractTsStatement, ITsExtractedStatement } from "./extractTsStatement";

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
  params: {
    name: string;
    type: string;
    typeAnnotation: string;
  }[];

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
  | ITsExtractedFunctionDeclaration
  | ITsExtractedVariableDeclaration
  | ITsExtractedUnknownDeclaration;

export function extractTsDeclaraction(dec: ITsDeclaration): ITsExtractedDeclaration {
  switch (dec.type) {
    case "ExportDefaultDeclaration":
      return {
        scope: "declaration",
        kind: "export",
        type: dec.type,
        declaration: extractTsDeclaraction(dec.declaration),
      };

    case "ExportNamedDeclaration":
      return {
        scope: "declaration",
        kind: "export",
        type: dec.type,

        declaration: extractTsDeclaraction(dec.declaration),
        source: dec.source ? extractTsExpression(dec.source) : dec.source,
        specifiers: dec.specifiers.map((i) => extractTsSpecifiers(i)),
      };

    case "FunctionDeclaration":
      return {
        scope: "declaration",
        kind: "function",
        type: dec.type,

        name: dec.id.name,
        isAsync: dec.async,
        isExpression: dec.expression,
        isGenerator: dec.generator,

        params: dec.params.map((p) => ({
          name: p.name,
          type: p.type,
          typeAnnotation:
            p.typeAnnotation.type === "TSTypeAnnotation"
              ? (p.typeAnnotation.typeAnnotation.type as string)
              : p.typeAnnotation.type,
        })),
        body:
          dec.body.type === "BlockStatement"
            ? dec.body.body.map((b) => extractTsStatement(b))
            : ([
                {
                  scope: "statement",
                  kind: "unknown",
                  type: "unknown",
                  message: `non-block statement: ${dec.body.type}`,
                },
              ] as ITsExtractedStatement[]),
      };

    case "VariableDeclaration":
      return {
        scope: "declaration",
        kind: "variable",
        type: dec.type,
        declarations: dec.declarations
          .filter((k) => k.type === "VariableDeclarator")
          .map((k) => ({
            name: k.id.name,
            init: extractTsExpression(k.init),
          })),
      };

    case "ImportDeclaration":
      return {
        scope: "declaration",
        kind: "import",
        type: dec.type,
        importKind: dec.importKind,
        source: extractTsExpression(dec.source),
        specifiers: dec.specifiers.map((i) => extractTsSpecifiers(i)),
      };

    default:
      return {
        scope: "declaration",
        kind: "unknown",
        type: (dec as any).type,
        message: "unknown declaration type",
        props: keys(dec),
      };
  }
}
