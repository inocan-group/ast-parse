/* eslint-disable unicorn/prefer-module */
/* eslint-disable unicorn/prefer-ternary */
import { parse } from "recast";
import { isTsDocument } from "~/@types";
import { ParseError } from "~/errors/ParseError";

/**
 * parses a file contents into an AST tree using the recast **typscript** parser.
 */
export function parseWithTypescript(content: string) {
  if (!content) {
    throw new ParseError(
      `source passed to parseWithTypescript() was not valid`,
      "ts/invalid-source"
    );
  }

  let result: unknown;
  try {
    result = parse(content, { parser: require("recast/parsers/typescript") });
  } catch (error) {
    throw new ParseError(`Failed to parse content: ${error.message}`, "ts/failed-to-parse");
  }

  if (!isTsDocument(result)) {
    throw new ParseError(`Content was parsed but result is malformed`, "ts/malformed-parse");
  }

  return result;
}
