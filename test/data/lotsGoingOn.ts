/* eslint-disable prefer-const */
import { isNonNullObject } from "common-types";
export const baz = 55;
export const baz2 = 75;

export let foobar = "hello world";

// single line comment for nothing function
function nothing() {
  if (isNonNullObject({})) {
    console.log("silly");
  }
  console.log("nada", baz, baz2);
}

/**
 * multi-line comment for DoIt function
 */
export function DoIt(a: number, b: string, cb?: () => string) {
  nothing();
  if (cb) {
    cb();
  }
  return `I am a function which works with numbers [${a}, ${b}]`;
}
