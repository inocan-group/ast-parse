import { TsScope, TsStatementKind } from "../ts-patterns";

export interface ITsExtractedStatement {
  scope: TsScope;
  kind: TsStatementKind;
  type: string;
  [key: string]: any;
}
