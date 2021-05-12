import { createError } from "brilliant-errors";

export const DataError = createError<"acorn" | "ts" | "extracted">("DataError", "ast-parse");
