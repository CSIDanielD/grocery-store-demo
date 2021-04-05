import { Action, InferActionCreatorFromAction } from "./action";
import { Reducer, ReducerMap } from "./reducer";

/** Describes an ActionCreator + Reducer combo */
export interface ActionReducer<A extends Action, R extends Reducer<any, any>> {
  readonly actionCreator: InferActionCreatorFromAction<A>;
  readonly reducer: R;
}

export interface ActionReducerMap<
  A extends Action,
  R extends Reducer<any, any>
> {
  [key: string]: ActionReducer<A, R>;
}

/** Infers an ActionReducer type from a Reducer */
export type InferActionReducerFromReducer<R> = R extends Reducer<
  infer S,
  Action<infer P>
>
  ? ActionReducer<Action<P>, Reducer<S, Action<P>>>
  : never;

/** Infers an ActionReducerMap type from a ReducerMap */
export type InferActionReducerMapFromReducerMap<M> = M extends ReducerMap<
  any,
  any
>
  ? { [K in keyof M]: InferActionReducerFromReducer<M[K]> }
  : never;
