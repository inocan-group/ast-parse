import { readFileSync } from "fs";
import { overviewExtraction } from "~/extractors/overviewExtraction";

describe("Typescript overview parsing results", () => {
  it("Named Exports is reported correctly", () => {
    const p = overviewExtraction(readFileSync("test/data/lotsGoingOn.ts", { encoding: "utf-8" }));
    console.log(JSON.stringify(p, null, 2));
  });

  it("Default Export is reported correctly", () => {
    const p = overviewExtraction(readFileSync("test/data/defaultExport.ts", { encoding: "utf-8" }));
    expect(p.defaultExport).toBeTruthy();
    expect(p.defaultExport).toHaveProperty("name");
    if (p.defaultExport) {
      expect(p.defaultExport.name).toBe("DoIt");
      expect(p.defaultExport.kind).toBe("function");
    }
  });
});
