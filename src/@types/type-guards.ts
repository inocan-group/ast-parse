import { IDictionary, isNonNullObject } from "common-types";

export function hasValue<T extends unknown = unknown>(thing: T): thing is T & { value: any } {
  return isNonNullObject(thing) && (thing as IDictionary).value !== undefined;
}
