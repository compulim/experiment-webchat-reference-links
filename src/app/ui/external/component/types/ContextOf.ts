import { type Context } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ContextOf<T extends Context<any>> = T extends Context<infer C> ? C : never;

export type { ContextOf };
