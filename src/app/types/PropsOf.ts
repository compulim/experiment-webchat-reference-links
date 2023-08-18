import { type ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsOf<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : never;

export type { PropsOf };
