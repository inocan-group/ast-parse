import { IDictionary, isNonNullObject } from "common-types";
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

export function isExtractedImportSpecifier(thing: unknown): thing is ITsExtractedImportSpecifier {
  return isNonNullObject(thing) && (thing as IDictionary).type === "ImportSpecifier";
}
