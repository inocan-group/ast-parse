import {
  hasValue,
  isExtractedNamedExport,
  isExtractedFunction,
  isExtractedVariable,
  isExtractedImport,
  isExtractedDefaultExport,
  isExtractedImportSpecifier,
  hasName,
} from "~/@types";
import {
  ITsSummaryImport,
  ITsSummaryLocalFunction,
  ITsSummaryExport,
  ITsSummaryOverview,
} from "~/@types/overview-types";
import { DataError } from "~/errors";
import { getDeclarations } from "~/parsing";

/**
 * Uses lower level extractions to produce a summary level overview
 */
export function overviewExtraction(content: string): ITsSummaryOverview {
  const declarations = getDeclarations(content);

  const imports: ITsSummaryImport[] = declarations
    .filter((d) => isExtractedImport(d))
    .map((d) => {
      if (!isExtractedImport(d)) {
        throw new DataError(
          `Invalid declaration; should only be imports here`,
          "extracted/invalid"
        );
      }
      return {
        source: hasValue(d.source) ? d.source.value : "unknown",
        symbols: d.specifiers.map((s) =>
          isExtractedImportSpecifier(s) && hasName(s.local) ? s.local.name : "unknown"
        ),
      };
    });

  const localFunctions: ITsSummaryLocalFunction[] = declarations
    .filter((d) => isExtractedFunction(d))
    .map((d) => {
      if (!isExtractedFunction(d)) {
        throw new DataError(
          "Invalid declaration; should only be functions here",
          "extracted/invalid"
        );
      }
      return {
        name: d.name,
        params: d.params.map((p) => ({
          name: p.name,
          type: p.typeAnnotation,
        })),
        returns: d.body?.find((i) => i.kind === "return")
          ? {
              type: d.body.find((i) => i.kind === "return")?.argument?.type,
              value: d.body
                .find((i) => i.kind === "return")
                ?.argument?.quasis?.map((q: any) => q.value.raw as string)
                .join(),
            }
          : "void",
      };
    });

  const defaultExport = declarations.find((d) => isExtractedDefaultExport(d)) || false;

  const namedExports: ITsSummaryExport[] = declarations
    .filter((d) => isExtractedNamedExport(d))
    .map((d) => {
      // TODO: this shouldn't be needed; let's see if we can improve type inference and remove
      if (!isExtractedNamedExport(d)) {
        throw new DataError(
          `Invalid declaration; should only be named exports here`,
          "extracted/invalid"
        );
      }

      return isExtractedFunction(d.declaration)
        ? {
            kind: "function",
            name: d.declaration.name,
            params: d.declaration.params.map((p) => ({ name: p.name, type: p.typeAnnotation })),
            returns: {
              type: d.declaration.body.find((i) => i.kind === "return")?.argument?.type as string,
              value: d.declaration.body
                .find((i) => i.kind === "return")
                ?.argument?.quasis?.map((q: any) => q.value.raw as string)
                .join() as string,
            },
          }
        : isExtractedVariable(d.declaration)
        ? {
            kind: "variable",
            name: d.declaration.declarations[0].name,
            type: d.declaration.declarations[0].init.type,
            value: hasValue(d.declaration.declarations[0].init)
              ? d.declaration.declarations[0].init?.value
              : undefined,
            ...(d.declaration.declarations.length > 1
              ? { warn: "There was more than one variable in the block!" }
              : {}),
          }
        : {
            kind: "unknown",
            name: `unknown declaration type: ${d?.declaration?.type}`,
            value: hasValue(d.declaration) ? d.declaration.value : undefined,
          };
    });

  return {
    namedExports,
    imports,
    localFunctions,
    defaultExport: isExtractedDefaultExport(defaultExport)
      ? isExtractedFunction(defaultExport.declaration)
        ? {
            kind: "function",
            name: defaultExport.declaration.name,
            params: defaultExport.declaration.params.map((p) => ({
              name: p.name,
              type: p.typeAnnotation,
            })),
            returns: {
              type: defaultExport.declaration.body.find((i) => i.kind === "return")?.argument.type,
              value: defaultExport.declaration.body
                .find((i) => i.kind === "return")
                ?.argument?.quasis?.map((q: any) => q.value.raw as string)
                .join(),
            },
          }
        : isExtractedVariable(defaultExport.declaration)
        ? {
            kind: "variable",
            name: defaultExport.declaration.declarations[0].name,
            type: defaultExport.declaration.declarations[0].init.type,
            value: hasValue(defaultExport.declaration.declarations[0].init)
              ? defaultExport.declaration.declarations[0].init?.value
              : undefined,
            ...(defaultExport.declaration.declarations.length > 1
              ? { warn: "There was more than one variable in the block!" }
              : {}),
          }
        : {
            kind: "unknown",
            name: `unknown declaration type: ${defaultExport?.declaration?.type}`,
            value: hasValue(defaultExport.declaration)
              ? defaultExport.declaration.value
              : undefined,
          }
      : false,
  };
}
