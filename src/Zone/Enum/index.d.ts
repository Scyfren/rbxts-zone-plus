/*
Below are typings for the static methods of ForeverHD's custom enums.
It's commented out because it's unnecessary for this package.
*/

// N: enum name
// V: value of enum
// P: property of enum

// export interface CustomEnumStatic<T extends EnumChild> {
// 	getName<S extends "name", U extends T[Exclude<keyof T, S>]>(
// 		valueOrProperty: U,
// 	): U extends T["value"]
// 		? (T & { value: U })[S]
// 		: U extends T["property"]
// 		? (T & { property: U })[S]
// 		: never | undefined;

// 	getValue<S extends "value", U extends T[Exclude<keyof T, S>]>(
// 		nameOrProperty: U,
// 	): U extends T["name"]
// 		? (T & { name: U })[S]
// 		: U extends T["property"]
// 		? (T & { property: U })[S]
// 		: never | undefined;

// 	getProperty<S extends "property", U extends T[Exclude<keyof T, S>]>(
// 		nameOrProperty: U,
// 	): U extends T["name"] ? (T & { name: U })[S] : U extends T["value"] ? (T & { value: U })[S] : never | undefined;
// }
