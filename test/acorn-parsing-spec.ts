import { IAcornDocument, parseWithAcorn } from "../src/index";
import {
  importNothingExportDefaultIndirectly,
  exportFooAndBarAsNamed,
  importNothingExportDefaultDirectly,
  exportFooAndBarAsCommonJs,
} from "./data";

describe("Acorn parsing", () => {
  it("acorn parser returns expected top-level props", () => {
    const parsed = parseWithAcorn(importNothingExportDefaultIndirectly());
    expect(parsed).toHaveProperty("program");
    expect(parsed).toHaveProperty("name");
    expect(parsed).toHaveProperty("loc");
    expect(parsed).toHaveProperty("type");
    expect(parsed).toHaveProperty("comments");
    expect(parsed).toHaveProperty("tokens");
  });

  it("acorn parser's program.body is an array of body elements", () => {
    const parsed = parseWithAcorn(importNothingExportDefaultIndirectly());
    expect(Array.isArray(parsed.program.body)).toBeTruthy();
  });

  it("the 'type' of the body elements includes the right declarations", () => {
    const p1 = parseWithAcorn(importNothingExportDefaultIndirectly()) as IAcornDocument;
    const indirectDeclarations = p1.program.body.map((i) => i.type);
    expect(indirectDeclarations).toHaveLength(2);
    expect(indirectDeclarations).toContain("VariableDeclaration");
    expect(indirectDeclarations).toContain("ExportDefaultDeclaration");

    const p2 = parseWithAcorn(importNothingExportDefaultDirectly());
    const indirectDeclarations2 = p2.program.body.map((i) => i.type);
    expect(indirectDeclarations2).toHaveLength(1);
    expect(indirectDeclarations2).toContain("ExportDefaultDeclaration");
    expect(indirectDeclarations2).not.toContain("VariableDeclaration");

    const p3 = parseWithAcorn(exportFooAndBarAsNamed());
    const d3 = p3.program.body.map((i) => i.type);
    console.log(d3);

    expect(d3).toHaveLength(3);
    expect(d3).toContain("ImportDeclaration");
    expect(d3).toContain("ExportNamedDeclaration"); // x2
    expect(d3).not.toContain("VariableDeclaration");
    expect(d3).not.toContain("FunctionDeclaration");

    const p4 = parseWithAcorn(exportFooAndBarAsCommonJs());
    const d4 = p4.program.body.map((i) => i.type);
    console.log(d4);

    expect(d4).toContain("VariableDeclaration");
    expect(d4).toContain("ExpressionStatement");
  });
});
