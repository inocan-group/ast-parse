import { ITsDeclaration } from "~/@types";
import { extractTsDeclaraction } from "~/extractors/extractTsDeclaration";
import { parseWithTypescript } from "../parseWithTypescript";

export type ITsAstInfo = {
  type: ITsDeclaration["type"];
  declaration?: string;
  declarations?: string[];
} & { [key: string]: unknown };

export function getDeclarations(content: string) {
  const ast = parseWithTypescript(content);
  return ast.program.body.map((i) => {
    return extractTsDeclaraction(i);
  });
}
