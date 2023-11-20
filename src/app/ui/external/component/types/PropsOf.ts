import { type ComponentType, type MemoExoticComponent } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PropsOf<T extends ComponentType<any> | MemoExoticComponent<ComponentType<any>>> = T extends ComponentType<
  infer P
>
  ? P
  : T extends MemoExoticComponent<ComponentType<infer P>>
  ? P
  : never;
