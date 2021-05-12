import { ITsSpecifier, ITsExtractedSpecifier } from "~/@types";
import { extractTsExpression } from "./extractTsExpression";

export function extractTsSpecifiers(sp: ITsSpecifier): ITsExtractedSpecifier {
  switch (sp.type) {
    case "ImportSpecifier":
      return {
        scope: "specifier",
        kind: "import",
        type: sp.type,
        local: extractTsExpression(sp.local),
      };

    default:
      return {
        scope: "specifier",
        kind: "unknown",
        type: sp.type,
      };
  }
}
