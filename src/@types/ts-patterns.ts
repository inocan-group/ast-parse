import { ITsComment } from "./ts-comments";

export type TsTokenType = "Keyword" | "Identifier" | "Punctuator" | "String";
export type TsKeyword =
  | "const"
  | "let"
  | "var"
  | "default"
  | "export"
  | "import"
  | "function"
  | unknown;

export type TsScope = "declaration" | "statement" | "expression";
export type TsDeclaratorKind = "import" | "export" | "function" | "variable";

export type TsPunctuator = "=" | "(" | ")" | "=>" | ";" | "," | "{" | "}" | unknown;

export type TsVariableKind = "const" | "let" | "var";

export interface ITsTokenCommentSections {
  leadingComments: ITsComment[];
  trailingComments: ITsComment[];
  innerComments: ITsComment[];
}

export type TsLoc = {
  start: {
    line: number;
    column: number;
  };
  end: {
    line: number;
    column: number;
  };
};

export type TsLines = {
  infos: [];
  mappings: [];
  cachedSourceMap: "object" | unknown;
  cachedTabWidth: "undefined" | unknown;
  length: number;
  name: unknown;
};

export type TsBodyLoc = {
  start: {
    line: number;
    column: number;
    token: number;
  };
  end: {
    line: number;
    column: number;
    token: number;
  };
  lines: TsLines;
  tokens: [];
  indent: number;
};
