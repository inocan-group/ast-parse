import { ITsTokenCommentSections, TsBodyLoc } from "./ts-patterns";

export interface ITsImportSpecifier extends ITsTokenCommentSections {
  type: "ImportSpecifier";
  imported: any;
  local: any;

  start: unknown;
  end: unknown;
  range: unknown;
  extra: unknown;
  loc: TsBodyLoc;
}

export type ITsSpecifier = ITsImportSpecifier;
