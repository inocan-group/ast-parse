import { IDictionary, isNonNullObject } from "common-types";
import { IAcornBody } from "./acorn-body";
import { IAcornLct, IAcornLocLines, IAcornLocToken } from "./acron-patterns";

/** top-level AST document resulting in parsing with **acorn** parser */
export interface IAcornDocument {
  program: {
    type: string;
    start: number;
    end: number;
    loc: {
      start: IAcornLct;
      end: IAcornLct;
      lines: IAcornLocLines;
      indent: number;
      tokens: IAcornLocToken[];
    };
    body: IAcornBody;
    sourceType: string;
  };
  name: null | unknown;
  loc: {
    start: IAcornLct;
    end: IAcornLct;
    lines: IAcornLocLines;
    indent: number;
    tokens: IAcornLocToken[];
  };
  type: "File" | unknown;
  comments: {};
  tokens: IAcornLocToken[];
}

export function isAcornDocument(thing: unknown): thing is IAcornDocument {
  return (
    isNonNullObject(thing) &&
    typeof (thing as IDictionary).program === "object" &&
    Array.isArray((thing as IDictionary)?.program?.body)
  );
}
