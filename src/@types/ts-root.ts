import { IDictionary, isNonNullObject } from "native-dash";
import { ITsDeclaration } from "./ts-declarations";
import { TsBodyLoc } from "./ts-patterns";
import { TsToken } from "./ts-tokens";

export interface ITsDocument {
  program: {
    type: "Program" | unknown;
    body: ITsDeclaration[];
    sourceType: "module" | unknown;
    loc: TsBodyLoc;
    errors: [];
    directives: unknown[];
  };
  name: null | unknown;
  loc: TsBodyLoc;
  type: "File" | unknown;
  comments: null | unknown;
  tokens: TsToken[];
  extra: unknown;
}

export function isTsDocument(thing: unknown): thing is ITsDocument {
  return (
    isNonNullObject(thing) &&
    typeof (thing as IDictionary).program === "object" &&
    (thing as IDictionary)?.program?.type === "Program"
  );
}
