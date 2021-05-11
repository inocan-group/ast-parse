import { keys } from "native-dash";
import { ITsDeclaration, TsDeclaratorKind } from "~/@types";
import { extractTsStatement } from "./extractTsStatement";

export interface ITsExtractedDeclaration {
  scope: "declaration";
  kind: TsDeclaratorKind;
  type: string;
  declaration?: ITsExtractedDeclaration;
  [key: string]: any;
}

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
        source: dec.source,
        specifiers: dec.specifiers,
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
              ? p.typeAnnotation.typeAnnotation.type
              : p.typeAnnotation,
        })),
        body:
          dec.body.type === "BlockStatement"
            ? dec.body.body.map((b) => extractTsStatement(b))
            : `non-block statement: ${dec.body.type}`,
      };

    case "VariableDeclaration":
      return {
        scope: "declaration",
        kind: "variable",
        type: dec.type,
        variables:
          dec?.declarations
            .filter((k) => k.type === "VariableDeclarator")
            .map((k) => ({
              name: k.id.name,
              init: k?.init?.type,
            })) || [],
      };

    case "ImportDeclaration":
      return {
        scope: "declaration",
        kind: "import",
        type: dec.type,
        props: keys(dec),
      };

    default:
      return {
        scope: "declaration",
        kind: "import",
        type: (dec as any).type,
        message: "unknown declaration type",
        props: keys(dec),
      };
  }
}
