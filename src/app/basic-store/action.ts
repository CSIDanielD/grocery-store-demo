import { ActionReducer, ActionReducerMap } from "./actionReducer";

export interface Action<P = any> {
  type: string;
  payload: P;
}

export type ActionCreator<P = any> = (payload: P) => Action<P>;

/** Infers an ActionCreator type from an Action */
export type InferActionCreatorFromAction<A> = A extends Action<infer P>
  ? ActionCreator<P>
  : never;

/** Infers an ActionCreator type from an Action */
export type InferPayloadFromAction<A> = A extends Action<infer P> ? P : never;

/** Infers an ActionCreator type from an ActionReducer */
export type InferActionCreatorForActionReducer<AR> = AR extends ActionReducer<
  infer A,
  any
>
  ? A extends Action<infer P>
    ? ActionCreator<P>
    : never
  : never;

/** Infers an ActionCreatorMap type from an ActionReducerMap */
export type InferActionCreatorMapFromActionReducerMap<
  M
> = M extends ActionReducerMap<any, any>
  ? { [K in keyof M]: InferActionCreatorForActionReducer<M[K]> }
  : never;
