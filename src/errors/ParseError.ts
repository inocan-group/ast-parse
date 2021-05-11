import { createError } from "brilliant-errors";

export const ParseError = createError<"acorn" | "ts">("ParseError", "ast-parse");
