/* eslint-disable prefer-const */
import { isNonNullObject, AWS_REGIONS } from "common-types";
export const baz = 55;
export var baz2 = 75;

export let foobar = `hello world: ${AWS_REGIONS.join(", ")}`;

/**
 * multi-line comment for DoIt function
 */
export default function DoIt(a: number, b: string, cb?: () => string) {
  if (cb && isNonNullObject({})) {
    cb();
  }
  return `I am a function which works with numbers [${a}, ${b}]`;
}
