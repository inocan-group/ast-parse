import { ITsExtractedExpression } from "./ts-ext-expression";

export interface ITsExtractedImportSpecifier {
  scope: "specifier";
  kind: "import";
  type: "ImportSpecifier";
  local: ITsExtractedExpression;
}
export interface ITsExtractedUnknownSpecifier {
  scope: "specifier";
  kind: "unknown";
  type: string;
}

export type ITsExtractedSpecifier = ITsExtractedImportSpecifier | ITsExtractedUnknownSpecifier;
