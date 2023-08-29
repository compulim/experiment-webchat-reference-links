export type ItemTypeOfArray<T extends Array<unknown> | ReadonlyArray<unknown> | T[]> = T extends Array<infer I>
  ? I
  : T extends ReadonlyArray<infer I>
  ? I
  : T extends (infer I)[]
  ? I
  : never;
