import { TsKeyword, TsLoc, TsPunctuator } from "./ts-patterns";

export type TsKeywordToken = {
  type: "Keyword";
  value: TsKeyword;
  loc: TsLoc;
};

export type TsPunctuatorToken = {
  type: "Punctuator";
  value: TsPunctuator;
  loc: TsLoc;
};

export type TsStringToken = {
  type: "String";
  value: string;
  loc: TsLoc;
};

export type TsIdentifierToken = {
  type: "Identifier";
  value: string;
  loc: TsLoc;
};

export type TsNumericToken = {
  type: "Numeric";
  /** the numeric value in string form */
  value: string;
  loc: TsLoc;
};

export type TsToken = TsKeywordToken | TsPunctuatorToken | TsStringToken | TsIdentifierToken;
