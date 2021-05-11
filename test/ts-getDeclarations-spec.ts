import { readFileSync } from "fs";
import { getDeclarations } from "~/parsing";

describe("TS getDeclarations()", () => {
  it("declarations correct for complex symbol env", () => {
    const p = getDeclarations(readFileSync("test/data/lotsGoingOn.ts", { encoding: "utf-8" }));
    console.log(JSON.stringify(p, null, 2));
  });
});
