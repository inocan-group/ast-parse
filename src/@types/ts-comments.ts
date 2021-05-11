import { TsBodyLoc } from "./ts-patterns";

export interface ITsBlockComment {
  type: "Block";
  value: string;
  loc: TsBodyLoc;
  leading: boolean;
  trailing: boolean;
}

export type ITsComment = ITsBlockComment;
