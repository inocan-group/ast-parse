import { readFileSync } from "fs";
import { parseWithTypescript } from "~/parsing/parseWithTypescript";
// import { lotsGoingOn } from "./data";

describe("Typescript Parsing", () => {
  it("typescript parser returns expected top-level props", () => {
    const p = parseWithTypescript(readFileSync("test/data/lotsGoingOn.ts", { encoding: "utf-8" }));

    expect(typeof p.program).toBe("object");

    // expect(p).toHaveProperty("name");

    // writeFileSync("tsv-body.json", JSON.stringify(p.program.body, null, 2), { encoding: "utf-8" });
    // writeFileSync("ts.json", JSON.stringify(desc(p), null, 2), { encoding: "utf-8" });
  });
});
