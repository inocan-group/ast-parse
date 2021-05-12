import { readFileSync } from "fs";
import { overviewExtraction } from "~/extractors/overviewExtraction";

describe("Typescript overview parsing results", () => {
  it("Named Exports is reported correctly", () => {
    const p = overviewExtraction(readFileSync("test/data/lotsGoingOn.ts", { encoding: "utf-8" }));
    console.log(JSON.stringify(p, null, 2));
  });
});
