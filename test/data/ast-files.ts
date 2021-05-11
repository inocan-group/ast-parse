export const importNothingExportDefaultIndirectly = () => `
const foobar = () => "hello world";

export default foobar;
`;

export const importNothingExportDefaultDirectly = () => `
export default () => "hello world";
`;

/**
 * JS code in "es module" format
 *
 * - `fancy` imported
 * - `foo` exported a const number
 * - `bar` exported as a function returning a string
 */
export const exportFooAndBarAsNamed = () => `
import fancy from "fancy";

export const foo = 45;
export const bar = (b) => { 
  return "bar is " + fancy(b); 
};
`;

/**
 * TS code which ...
 *
 * - `fancy` imported
 * - `foo` exported a const number
 * - `bar` exported as a function returning a string
 */
export const tsExportFooAndBarAsNamed = () => `
 import fancy from "fancy";
 
 export const foo: number = 45;
 export const bar = (b) => { 
   return "bar is " + fancy(b); 
 };
 `;

/**
 * JS code in "es module" format
 *
 * - `fancy` imported with require
 * - `foo` exported a const number
 * - `bar` exported as a function returning a string
 */
export const exportFooAndBarAsCommonJs = () => `
 const fancy = require("fancy");

 const foo = 45;
 const bar = (b) => { 
   return "bar is " + fancy(b); 
 };

 module.exports = { foo, bar };
 `;

export const aFunction = () => `
function foobar(foo: number) => "foo is " + foo;\n`;

/**
 * - import `foo`, `bar` from common-types
 * - const `baz` set to number w/o explicit typing
 * - const `baz2` set to number w/ explicit typing
 * - let `foobar` to string value
 * - function `nothing` does nothing
 * - function `DoIt` is exported as named export
 */
export const lotsGoingOn = () => `
import { foo, bar } from "common-types";

const baz = 55;
const baz2 = 75;

let foobar = "hello world";

function nothing() {
  console.log("nada", baz, baz2);
};

export function DoIt(a: number, b: string) { 
  return "I am a function";
};
`;
