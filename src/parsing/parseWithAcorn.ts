/* eslint-disable unicorn/prefer-ternary */
/* eslint-disable unicorn/prefer-module */
import { parse } from "recast";
import { isAcornDocument } from "~/@types";
import { ParseError } from "~/errors/ParseError";

/**
 * parses a file contents into an AST tree using the recast **acorn** parser.
 */
export function parseWithAcorn(content: string) {
  if (!content) {
    throw new ParseError(
      `source passed to astParseWithAcron() was not valid`,
      "acorn/invalid-source"
    );
  }

  let result: unknown;
  try {
    result = parse(content, {
      parser: require("recast/parsers/acorn"),
    });
  } catch (error) {
    throw new ParseError(`Failed to parse content: ${error.message}`, "acorn/failed-to-parse");
  }

  if (!isAcornDocument(result)) {
    throw new ParseError(`Content was parsed but result is malformed`, "acorn/malformed-parse");
  }

  return result;
}
