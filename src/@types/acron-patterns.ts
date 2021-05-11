import { AcornKeywords, AcornSymbols } from "./acorn-general";
import { AstOperands } from "./general";

export interface IAcornLineInfo {
  line: string;
  indent: number;
  locked: boolean;
  sliceStart: number;
  sliceEnd: number;
}

export interface IAcornLocLines {
  infos: IAcornLineInfo[];
  mappings: "array" | string;
  cachedSourceMap: null | "object" | unknown;
  cachedTabWidth?: "undefined" | unknown;
  length: number;
  name: null | string;
}

/**
 * Provides the line, column, and token of the given node
 */
export interface IAcornLct {
  line: number;
  column: number;
  token: number;
}

export interface IAcornLocToken {
  type: {
    label: AcornKeywords | "name" | "string" | AstOperands;
    keyword?: AcornKeywords;
    beforeExpr: boolean;
    startsExpr: boolean;
    isLoop: boolean;
    isAssign: boolean;
    prefix: boolean;
    postfix: boolean;
    binop: null | unknown;
    updateContext: null | unknown;
  };
  value: AcornKeywords | AstOperands | AcornSymbols;
  start: number;
  end: number;
  loc: {
    start: IAcornLct;
    end: IAcornLct;
  };
}

export interface IAcornLoc {
  start: IAcornLct;
  end: IAcornLct;
  lines: IAcornLocLines;
  tokens: IAcornLocToken[];
}
