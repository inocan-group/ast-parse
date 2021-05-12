import { IDictionary, isNonNullObject } from "common-types";

export function hasValue<T extends {} = {}>(thing: T): thing is T & { value: any } {
  return isNonNullObject(thing) && (thing as IDictionary).value !== undefined;
}
