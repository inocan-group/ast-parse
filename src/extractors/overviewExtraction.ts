import { isFunctionDeclaration, isVariableDeclaration, hasValue } from "~/@types";
import { ITsAstOverview } from "~/@types/overview-types";
import { getDeclarations } from "~/parsing";

/**
 * Uses lower level extractions to produce a summary level overview
 */
export function overviewExtraction(content: string) {
  const declarations = getDeclarations(content);

  const namedExports: ITsAstOverview["namedExports"] = declarations
    .filter((d) => d.kind === "export" && d.type === "ExportNamedDeclaration")
    .map((e) => {
      return isFunctionDeclaration(e.declaration)
        ? {
            kind: "function",
            name: e.declaration.name,
            params: e.declaration.params.map((p) => ({ name: p.name, type: p.typeAnnotation })),
            returns: e.declaration.scope,
          }
        : isVariableDeclaration(e.declaration)
        ? {
            kind: "variable",
            name: e.declaration?.declarations[0].name,
            type: e.declaration?.declarations[0].init.type,
            value: hasValue(e.declaration?.declarations[0].init)
              ? e.declaration?.declarations[0].init?.value
              : undefined,
            ...(e.declaration.declarations.length > 1
              ? { warn: "There was more than one variable in the block!" }
              : {}),
          }
        : {
            name: `unknown declaration type: ${e?.declaration?.type}`,
            type: "unknown",
            value: hasValue(e.declaration) ? e.declaration.value : undefined,
          };
    });

  return { namedExports };
}
