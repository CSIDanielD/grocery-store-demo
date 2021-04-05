import { Action } from "./action";

export type Reducer<S, A extends Action> =
  | ((getState: () => S, action: A) => S)
  | ((getState: () => S, action: A) => Promise<S>);

export type ReducerMap<S = any, A extends Action = Action<any>> = {
  [actionType: string]: Reducer<S, A>;
};

export type InferActionFromReducer<R> = R extends Reducer<any, infer A>
  ? A
  : never;

export type InferActionsFromReducerMap<M> = M extends ReducerMap<any, any>
  ? { [K in keyof M]: InferActionFromReducer<M[K]> }
  : never;

/** Infers an Action union type from a ReducerMap */
export type InferActionUnionFromReducerMap<M> = M extends ReducerMap<
  any,
  infer A
>
  ? A
  : never;
