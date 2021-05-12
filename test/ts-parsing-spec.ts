import { readFileSync } from "fs";
import { parseWithTypescript } from "~/parsing/parseWithTypescript";
// import { lotsGoingOn } from "./data";

describe("Typescript Parsing", () => {
  it("typescript parser returns expected top-level props", () => {
    const p = parseWithTypescript(readFileSync("test/data/lotsGoingOn.ts", { encoding: "utf-8" }));

    expect(typeof p.program).toBe("object");
  });
});
