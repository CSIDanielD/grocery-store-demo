import { Action, ActionCreator } from "./action";
import { ActionReducer, ActionReducerMap } from "./actionReducer";
import { Reducer, ReducerMap } from "./reducer";

/** Infers an ActionCreator type from an Action */
export type InferActionCreatorFromAction<A> = A extends Action<infer P>
  ? ActionCreator<P>
  : never;

/** Infers an ActionCreator type from an Action */
export type InferPayloadFromAction<A> = A extends Action<infer P> ? P : never;

/** Infers an ActionCreator type from a Reducer */
export type InferActionCreatorFromReducer<R> = R extends Reducer<any, infer P>
  ? ActionCreator<P>
  : never;

/** Infers an ActionCreator type from an ActionReducer */
export type InferActionCreatorFromActionReducer<AR> = AR extends ActionReducer<
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
  ? { [K in keyof M]: InferActionCreatorFromActionReducer<M[K]> }
  : never;

/** Infers an ActionReducer type from a Reducer */
export type InferActionReducerFromReducer<R> = R extends Reducer<
  infer S,
  infer P
>
  ? ActionReducer<Action<P>, Reducer<S, P>>
  : never;

/** Infers an ActionReducerMap type from a ReducerMap */
export type InferActionReducerMapFromReducerMap<M> = M extends ReducerMap<
  any,
  any
>
  ? { [K in keyof M]: InferActionReducerFromReducer<M[K]> }
  : never;

// From https://github.com/microsoft/TypeScript/issues/32689#issuecomment-517933876
type Merge<A, B> = ({ [K in keyof A]: K extends keyof B ? B[K] : A[K] } &
  B) extends infer O
  ? { [K in keyof O]: O[K] }
  : never;
